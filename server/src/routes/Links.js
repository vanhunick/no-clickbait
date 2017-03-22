// Import node module
import express from 'express';
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

const router = express.Router();

let  url = 'mongodb://localhost:27017/no-clickbait';


// Arrow functions
router.get('/', (req, res) => {

  res.send({message: 'Hello Here is a link!!'});
});


// Add a title for a link
router.post('/addtitle', (req, res ) => {
  console.log("Adding title");

  // Connect to db
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  var col = db.collection('urls');

  console.log(req.body);
  console.log(req.body.url);


    col.insertOne({title : req.query.title, url: req.query.url}, (err, result) => {
    assert.equal(err, null);
    res.send({succes : true});
    console.log("Inserted a document into the restaurants collection.");
      db.close();
    });
  });
});



// Return a title for a link
router.get('/gettitle', (req, res ) => {

  // Connect to db
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  var col = db.collection('urls');

  col.find({url: ""+req.query.url}).toArray(function(err, results){

    if(results.length > 0){
        res.send({title : results[0].title});
    }
  });

  db.close();
  });
});

const getTitle = function (url) {
  return "Not a clickbait title";
}


export default router;
