const express = require('express'),
      app = express(),
      db = require('./db'),
      path = require('path'),
      dotenv = require('dotenv').config();


//db.connect();

// parse URL into a JSON object and shorten URL
function shorten(longURL){
  var tempObj = {'longURL':longURL,'shortURL':db.uid()};
  db.insertURL(tempObj);
  return tempObj;
}

// Lookup shortened url and redirect to original url
function lookup(shortURL){
  return db.lookupURL(shortURL);
}

//store JSON object to mongoDB

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/shorten', (req, res) => {
  // route to create and return a shortened url
});

//read arguments passed to URL and save into JSON object
app.get('/:tagId', (req, res) => {
  // res.send('tagId: '+ req.params.tagId)
  //res.send(shorten(req.params.tagId))

  //If shortender URL is sent redirect to stored full URL
  //Return shortened URL to sender
  res.send(lookup(req.params.tagId));
  // db.lookupURL({'shortURL':req.params.tagID}).length === 0 ? res.send(shorten(req.params.tagId)) : res.send(lookup(req.params.tagId))

});

app.listen(3000);
