require('dotenv').config();

const express = require('express'),
      app = express(),
      path = require('path'),
      Promise = require('bluebird'),
      bodyParser = require('body-parser'),
      morgan = require('morgan');

module.exports = require('./db')().then(runApp);

app.listen(process.env.PORT || 3000);

function runApp(db){
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(bodyParser.json());
  app.use(morgan('common'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  app.post('/api/shorten', (req, res, next) => {
    return db.insertURL(req.body)
    .then(obj => res.json({shortURL: `https://webshort.herokuapp.com/${obj.insertedId}`}))
    .catch(next);
  });

  app.get('/:shortURL', (req, res, next) => {
    return db.lookupURL(req.params.shortURL)
    .then(arr => res.redirect(`http://${arr[0].longURL}`))
    .catch(next);
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
      next(err);
  });


}
