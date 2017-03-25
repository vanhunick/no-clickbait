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

    col.insertOne({title : req.body.title, url: req.body.url}, (err, result) => {

    if(err === null){
        res.send({succes : true});
    }

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


// Return all title for the given links
router.get('/getAllTitles', (req, res ) => {
  console.log("Finding all titles!");
  let col = db.getDB().collection('urls');
  console.log(req.query.urls);
  console.log(req.query.urls instanceof Array)


  col.find({url: { $in : req.query.urls} }).toArray(function(err, results){
    if(err !== null){
      console.log(err);
    } else {
      if(results.length > 0){
        console.log("Sending title back multiple");
          res.send({title : results[0].title});
      } else {
        console.log("No title found multiple");
      }
    }
  });
});

export default router;
