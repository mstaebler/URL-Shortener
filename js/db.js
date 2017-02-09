const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv').config()

// Connect to the db
module.exports = {
  connect: function(){
    MongoClient.connect("mongodb://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST, (err, db) => {
      if(!err) {
        console.log("we are connected")
      }
      else{
        console.log('failed to connect')
      }
    })
  }
}
