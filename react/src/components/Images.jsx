import React, { Component } from 'react'
import '../sass/styles.css'
import axios from 'axios'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      imgSizes: [],
      screenWidth: 1140,
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3001/list')
    .then((response) => {
      const imgList = Object.entries(response.data).map(item => item[1])
      this.setState({ imgList })
    })
    axios.get('http://localhost:3001/dimensions')
    .then((response) => {
      const imgSizes = Object.entries(response.data).map(item => item[1])
      this.setState({ imgSizes }, () => this.imageOrganize())
    })
    window.addEventListener('resize', this.resize)
    this.resize()
    
  }

  resize = () => this.setState({ screenWidth: window.innerWidth})

  imageOrganize = () => {
    const { imgList, imgSizes, screenWidth } = this.state
    let large = []
    let small = []
    imgSizes.map((img, i) => {
      if(img.width > 480) {
        large.push(<img className="large_img" src={require(`../prenuvo_db/862625ef/${imgList[i]}/bw-gif.gif`)} key={i} alt={imgList[i]} />)
      } else {
        small.push(<img className="small_img" src={require(`../prenuvo_db/862625ef/${imgList[i]}/bw-gif.gif`)} key={i} alt={imgList[i]} />)
      }   
    })

    this.setState({ large, small })
  }

  render() {
    const { small, large, height } = this.state

    return (
      <div className="img_page">
       <h1>MRI</h1> 
        <div width={'100%'} className="large">{large}</div>
        <div  className="small">{small}</div>
      </div>
    )
  }
}