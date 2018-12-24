const express = require('express')
const fs = require('fs')
// const bodyParser = require('body-parser');
const app = express()
var sizeOf = require('image-size');

// app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let files = {}
const list = fs.readdirSync('../react/src/prenuvo_db/862625ef', (err, file) => {
  if(err) return console.log('Error', err)
  return file
})

let dimensions = {}
const getDimensions = () => {
  for(i=0; i<list.length; i++) {
    dimensions[i] = sizeOf(`../react/src/prenuvo_db/862625ef/${list[i]}/bw-gif.gif`)
  } 
}
getDimensions()


files = Object.assign({}, list)

app.get("/list", (req, res) => {
  res.send(Object.assign({}, files))
})

app.get("/dimensions", (req, res) => {
  res.send(dimensions)
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`listening on port ${port}...`))