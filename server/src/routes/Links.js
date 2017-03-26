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
router.post('/addTitle', (req, res ) => {
  console.log("Adding title");

    let col = db.getDB().collection('urls');

    let formatedURL = formatURL(req.body.url);
    col.insertOne({title : req.body.title, url: formatedURL}, (err, result) => {

    if(err === null){
        res.send({succes : true});
    }

  });
});


// Removes the start of the url and any time at the end
function formatURL(url){
  let shortURL = url.slice(url.indexOf('/watch'), url.length-1);
  shortURL = shortURL.slice(0, shortURL.indexOf('&t='));
  return shortURL;
}


// Return a title for a link
router.get('/getTitle', (req, res ) => {
  console.log("grabbing title");
  var col = db.getDB().collection('urls');

  col.find({url: formatURL(req.query.url)}).toArray(function(err, results){

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

  for(let i = 0; i < req.query.urls.length; i++){
    req.query.urls[i] = req.query.urls[i].slice(0, req.query.urls[i].indexOf('&t='));
  }

  col.find({url: { $in : req.query.urls} }).toArray(function(err, results){
    if(err !== null){
      console.log(err);
    } else {
      if(results.length > 0){
        console.log("Sending title back multiple");
          res.send({titles : results});
      } else {
        console.log("No title found multiple");
      }
    }
  });
});

export default router;
