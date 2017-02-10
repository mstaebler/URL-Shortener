const MongoClient = require('mongodb').MongoClient,
      dotenv = require('dotenv').config();
let urls = {};

// Connect to the db
module.exports = {
  connect: () => {
    MongoClient.connect("mongodb://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST, (err, db) => {
      if(!err) {
        console.log("we are connected");
        urls = db.collection('urls');
      }else{
        console.log('failed to connect');
      }
    })
  },
  insertURL: (obj) => {
    urls.save(obj, (err, result) => {
      if(err) return console.log(err);
      //console.log('saved to database '+ obj);
    })
  },
  lookupURL: (id, callback) => {
    // console.log("lookup"+urls);
    urls.find({'longURL': id}).toArray((err, docs) => {
      //console.log("Found the following records");
      //console.log(docs);
      //callback(docs)
      return docs;
    })
  },
  uid: () => {
    var uid = Object.keys(urls.find()).length;
    console.log("the current uid is "+uid);
    return uid++;
  }
}
