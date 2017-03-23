// Import node module
import express from 'express';
// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

var db = require('../db');

const router = express.Router();

let  url = 'mongodb://localhost:27017/no-clickbait';


// Arrow functions
router.get('/', (req, res) => {
  res.send({message: 'Hello Here is a link!!'});
});


// Add a title for a link
router.post('/addtitle', (req, res ) => {
  console.log("Adding title");

  var col = db.getDB().collection('urls');

  console.log(req.body);
  console.log(req.body.url);

    col.insertOne({title : req.body.title, url: req.body.url}, (err, result) => {

    if(err === null){
        res.send({succes : true});
    }

    console.log("Inserted a document into the restaurants collection.");
  });
});


// Return a title for a link
router.get('/gettitle', (req, res ) => {
  console.log("grabbing title");
  var col = db.getDB().collection('urls');

  col.find({url: ""+req.query.url}).toArray(function(err, results){

    if(results.length > 0){
      console.log("Sending title back");
        res.send({title : results[0].title});
    } else {
      console.log("No title found");
    }
  });
});


export default router;
