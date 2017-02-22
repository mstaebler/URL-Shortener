require('dotenv').config();

var Promise = require('bluebird'),
    MongoClient = require('mongodb').MongoClient,
    db;

Promise.promisifyAll(MongoClient);

module.exports = function() {
  return MongoClient.connectAsync(process.env.MONGO_CONNECTION_STRING)
  .then(connection => {
    db = connection.collection('urlStore');
    count = connection.collection('count');
    return {
      insertURL,
      lookupURL
    };
  });
};

function insertURL(obj){
  db.save(obj);
}

function lookupURL(id) {
  return Promise.resolve(db.find({'longURL': id}).toArray());
}
