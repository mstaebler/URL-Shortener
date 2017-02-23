require('dotenv').config();

var Promise = require('bluebird'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    db;

Promise.promisifyAll(MongoClient);

module.exports = function() {
  return MongoClient.connectAsync(process.env.MONGO_CONNECTION_STRING)
  .then(connection => {
    db = connection.collection('urlStore');
    return {
      insertURL,
      lookupURL
    };
  });
};

function insertURL(obj){
  return Promise.resolve(db.insertOne(obj));
}

function lookupURL(id) {
  return Promise.resolve(db.find({_id: ObjectId(id)}).limit(1).toArray());
}
