import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../sass/styles.css'

const accept = ['I understand this']
const general_Symptoms = ['Recent weight gain', 'Recent weight loss']
const head_Symptoms = [
  'Frequent headaches',
  'Frequent migraines',
  'Head injuries or concussion',
  'Eye pain',
  'Earache or ear drainage',
  'Ringing in the ears',
  'Hearing loss',
  'Frequent colds',
  'Frequent hayfever',
  'Sinus pain',
  'Blurred vision',
  'Double vision',
  'See halos around eyes',
  'Loss of sense of smell',
  'Sores in mouth',
  'Painful or bleeding gums',
  'Speech difficulties',
  'Frequent nosebleeds',
  'Numbness on one side of the face',
  'Pain in the jaw',
  'Trouble with balance',
  'Seizures',
  'Personality change',
  'Memory change',
  'Memory loss',
  'Problems sleeping',
  'Changes in ability to walk or perform daily activities',
  'Pressure in the head',
]
const more_About_Headaches = ['Front', 'Back', 'Left Side', 'Right Side']
const frequency_Of_Headaches = ['Daily', '2/2 times a week', 'Weekly', 'Less frequent']
const throat_Neck_Esophegal_Symptoms = [
  'Frequent heartburn or acid reflux',
  'Chest pain that is worse with eating',
  'Nausea',
  'Frequent vomiting',
  'Frequent choking on food',
  'Lumps or Swelling in Neck',
  'Lumps or Swelling under the Jaw (Glands)',
  'Stiff, Painful Neck',
  'Frequent Sore Throats',
  'Difficulty in Swallowing',
]
const respiratory_Symptoms = ['Coughing up Sputum', 'Wheezing or Asthma', 'Feeling of breathlessness', 'Chest pain when coughing', 'Chest pain when breathing']
const cardiovascular_Symptoms = [
  'Rapid heartbeat',
  'Irregular heartbeat (palpitations)',
  'Shortness of breath without exercise',
  'Shortness of breath with exercise',
  'Shortness of breath on lying flat in bed',
  'Pale skin',
  'Heart disease',
  'High blood pressure',
  'Chest discomfort',
  'Heart murmur',
  'High cholesterol',
  'Frequent fainting or blackouts',
  'Unexplained weakness',
]
const abdominal_Symptoms = [
  'Belching',
  'Nausea or vomiting',
  'Vomiting blood',
  'Frequent Diarrhea',
  'Painful bowel movements',
  'Black bowel movements',
  'Abdominal pain after eating',
  'Abdominal pain unrelated to eating',
  'Elevated blood sugar',
  'Jaundice (yellow skin)',
  'Unusual thirst',
  'Passing blood rectally',
  'Constipation',
  'Blood in urine',
  'Difficulty starting and maintaining a steady stream of urine',
  'Excessive urination during night',
  'Excessive urination during day',
  'Loss of bladder control',
  'Cloudy urine',
  'Passing stones in urine',
  'Repeated urinary tract infections',
  'Flank pain (pain that runs from ribs to hips on one side)'
]
const gender_Specific_Symptoms = [
  'Bleeding between periods',
  'Vaginal bleeding since menopause',
  'Lumps in breast',
  'Bloated or irritable before periods',
  'Vaginal discharge',
  'Vaginal itching',
  'Painful periods',
  'Pain with intercourse',
  'Scant periods',
  'Lactation unrelated to pregnancy'
]
const gender_Specific_Symptoms2 = [
  'High prostate PSA',
  'Discharge from penis',
  'Any swelling or bumps in testicles',
  'Pain in testicles',
  'Breast growth'
]
const muscles_Joints_Bones = [
  'Back pain/ache',
  'Joint pain',
  'Joint swelling',
  'Numbness'
]
const symptoms_Extremeties = [
  'Tingling in hands or feet',
  'Shaking in hands or feet',
  'Pain in calves or thighs when walking',
  'Swelling in hands or feet',
  'Skin turning blue in fingers or toes'
]

const arrays = [
  accept,
  general_Symptoms,
  head_Symptoms, 
  more_About_Headaches, 
  frequency_Of_Headaches, 
  throat_Neck_Esophegal_Symptoms,
  respiratory_Symptoms,
  cardiovascular_Symptoms,
  abdominal_Symptoms,
  gender_Specific_Symptoms,
  gender_Specific_Symptoms2,
  muscles_Joints_Bones,
  symptoms_Extremeties
]

export default class Form extends Component {
  state = {
    questionary: {}
  }

  componentDidMount = () => {
    this.arraysToState()
  }

  replace = (item) => item.replace(/ /g, '_')

  arraysToState = () => {
    let stateList = []
    for(let array of arrays) {
      array.map(item => stateList.push(this.replace(item)))
    }
    let questionary = {}
    stateList.forEach(item => questionary[item] = false)
    this.setState({ questionary })
  }

  toggleCheckboxChange = (key) => {
    const { questionary } = this.state
    questionary[key] = !this.state.questionary[key]
    this.setState({ questionary })
  }

  createCheckbox = (label, type="checkbox") => {
    const key = this.replace(label)
    return (
      <span className="checkbox">
        <label>
          <input
              type={type}
              value={label}
              checked={this.state.questionary ? this.state.questionary[key] : false}
              onClick={type === 'radio' ? () => this.toggleCheckboxChange(key) : undefined}
              onChange={type === 'checkbox' ? () => this.toggleCheckboxChange(key) : undefined}
          />
          &nbsp;{label}
        </label>
      </span>
    )
}

createCheckboxes = (array) => (
  array.map(item => this.createCheckbox(item))
)

questionSection = ({header, text, array, text2 = false, array2}) => {
  return (
  <div>
     <hr/>
     <span className="section">
      <h3>{header}</h3>
      <div className="explanationTitle">{text}</div>
      <div className="checkboxContainer">{this.createCheckboxes(array)}</div>
      {!!text2 && (
        <span>
          <div className="explanationTitle">{text2}</div>
          <div className="checkboxContainer">{this.createCheckboxes(array2)}</div>
        </span>  
      )}
     </span>
  </div>
  )
}

quitForm = (type) => {
  const check = this.state.questionary[this.replace('I understand this')]
  if(!check) return alert('Please check "I understand this"...'  )
  if(type === 'save') return alert('form saved...')
  if(type === 'finish') return alert('Succesfuly finished...')
  
}

  render() {
    const { createCheckbox, createCheckboxes } = this
    const asterix = <span style={{ color: 'red'}}>*</span>
    return (
      <div className="form">
        <a href="#">Medical History &#62; Symptoms</a>
        <div>
          <h2>This section asks about any symptoms you have been experiencing lately</h2>
          <div className="note1">A note about the symptoms you are or have recently been feeling {asterix}</div>
          <div className="note2">A Preuvo scan is a screen for cancer and many major diseases.</div>
          <div className="note3">The symptoms that you are feeling now or recently are important context for our review of the images that we acquire of your body.</div>
          <div className="note4">However, if you are feeling acute symptoms, it is important that you visit your family doctor to determine what is the best diagnostic approach that you
                should follow. A Prenuvo scan can diagnose many conditions, can provide additional insight to a diagnosis but it is not always the most diagnostically
                relevant approach for any one particular condition.</div>
                <div className="checkboxContainer">{createCheckbox('I understand this', 'radio')}</div>
        </div>

        {this.questionSection({
            header: 'General Symptoms',
            text: 'Check any of the following symptoms that you are or have recently experienced',
            array: general_Symptoms
          })
        }

        {this.questionSection({
            header: 'Head Symptoms',
            text: 'Check any of the following head symptoms that you are or have recently experienced',
            array: head_Symptoms
          })
        }

        {this.state.questionary[this.replace(head_Symptoms[0])] && (
        <div  className="section">
          <h3>Tell us more about your headaches</h3>
          <div className="headacheAdd">
            <div >
              <div className="explanationTitle">What are the most frequent location(s) of your headaches? {asterix}</div>
              <div className="checkboxContainer">{createCheckboxes(more_About_Headaches)}</div>
            </div>
            <div>
              <div className="explanationTitle">What is the frequency of your headaches? {asterix}</div>
              <div className="checkboxContainer">{createCheckboxes(frequency_Of_Headaches)}</div>
            </div>
          </div>
        </div>
        )}

        {this.questionSection({
            header: 'Throat, Neck and Esophegal symptoms',
            text: 'Check any of the following symptoms that you are or have recently experienced',
            array: throat_Neck_Esophegal_Symptoms
          })
        }

        {this.questionSection({
            header: 'Respiratory symptoms',
            text: 'Check any of the following symptoms that you are or have recently experienced',
            array: respiratory_Symptoms
          })
        }

        {this.questionSection({
            header: 'Cardiovascular symptoms',
            text: 'Check any of the following symptoms that you are or have recently experienced',
            array: cardiovascular_Symptoms
          })
        }

        {this.questionSection({
            header: 'Abdominal symptoms',
            text: 'Check any of the following symptoms that you are or have recently experienced',
            array: abdominal_Symptoms
          })
        }

        {this.questionSection({
            header: 'Gender specific symptoms',
            text: 'For women only, check any of the following symptoms that you are or have recently experienced',
            array: gender_Specific_Symptoms,
            text2: 'For men only, check any of the following symptoms that you are or have recently experienced',
            array2: gender_Specific_Symptoms2
          })
        }

        {this.questionSection({
            header: 'Muscles, joints and bones',
            text: 'Check any of the following symptoms that you are or have recently experienced',
            array: muscles_Joints_Bones
          })
        }

        {this.questionSection({
            header: 'Symptoms in the extremeties',
            text: 'Check any of the following symptoms that you are or have recently experienced',
            array: symptoms_Extremeties
          })
        }
        
        {this.state.questionary[this.replace(symptoms_Extremeties[1])] && (
        <div  className="section">
          <h3>Tell us more about the shaking in your hands of feet</h3>
          <div className="explanationTitle">Where have you been experiencing the shaking (tick one or all that
apply)? {asterix}</div>
          <div className="checkboxContainer">{createCheckboxes(more_About_Headaches)}</div>  
        </div>
        )}

        <div className="saveFinish">
          <Link to="#" className="link" onClick={() => this.quitForm('save')}>Save</Link> 
          <Link to="#" className="link" onClick={() => this.quitForm('finish')}>Finish</Link>
         </div>
      </div>
    )
  }
}