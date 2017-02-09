const express = require('express')
const app = express()
const db = require('./db')

// Connect to the database
db.connect()

function uid(){
  return Math.floor(new Date().valueOf()* Math.random())
}

function shorten(longURL){
  return {'longURL':longURL,'shortURL':uid()}
}

app.get('/', (req, res) => {
  res.send('hello world')
})

//read arguments passed to URL and save into JSON object
app.get('/:tagId', (req, res) => {
  // res.send('tagId: '+ req.params.tagId)
  res.send(shorten(req.params.tagId))
})

app.listen(3000)

//parse URL into a JSON object
//store JSON object to mongoDB
//shorten URL
//Return shortened URL to sender
//If shortender URL is sent redirect to stored full URL
