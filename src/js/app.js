require('dotenv').config();

const express = require('express'),
      app = express(),
      path = require('path'),
      Promise = require('bluebird'),
      bodyParser = require('body-parser');

module.exports = require('./db')().then(runApp);

function runApp(db){
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  app.post('/api/shorten', (req, res) => {
    console.log(req.body);
    return db.insertURL(req.body)
      .then(res => res.json({res: res}));
  });

  //read arguments passed to URL and save into JSON object
  // If the URL is in the database return the database entry. If it is not in the database
  // store it in there and return a short link
  app.get('/:tagId', (req, res) => {
    return db.lookupURL(req.params.tagId)
    .then(url => {
      res.json({url: url});
    });
  });

  app.get('/failhard', (req, res) => {
    return Promise.reject(new Error('Me a stupid error yo.'));
    // calling this endpoint will result in an error being handed into next()
    // which will bypass any other handlers defined below this, and go straight to the
    // error handler at the end of this file that i added
  });

  // this will catch errs, or at least it should, you should try it, easy to do
  app.use(function(err, req, res, next) {
      res.error = err;
      res.status(err.status || 500);
      res.json({
          message: err.message
      });
  });

  app.listen(3000);
}
