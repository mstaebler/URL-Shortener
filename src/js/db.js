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
      lookupURL,
      getGlobalCount
    };
  });
};

function insertURL(obj){
  return Promise.resolve(db.insertOne(obj));
}

function lookupURL(id) {
  return Promise.resolve(db.find({'shortURL': id}).limit(1).toArray());
}

function getGlobalCount() {
    return count.find({counter: }) || 0;
}

function incrementGlobalCount() {
    count.findOneAndUpdate()
}
