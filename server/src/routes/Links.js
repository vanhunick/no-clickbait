// Import node module
import express from 'express';
// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

var db = require('../db');

const router = express.Router();

let  url = 'mongodb://localhost:27017/no-clickbait';


// Arrow functions
// router.get('/', (req, res) => {
//   res.send({message: 'Hello Here is a link!!'});
// });


// Add a title for a link
router.post('/addTitle', (req, res ) => {
    let col = db.getDB().collection('urls'); // Grab the collection

    let formatedURL = formatURL(req.body.url);
    col.insertOne({title : req.body.title, url: formatedURL}, (err, result) => {
    res.send({succes : err === null});
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
  var col = db.getDB().collection('urls'); // Grab the collection

  col.find({url: formatURL(req.query.url)}).toArray((err, results) =>{
    if(err){
      console.log(err)
      return;
    }

    // Check if a title is found
    if(results.length > 0){
        res.send({title : results[0].title});
    }
  });
});


// Return all title for the given links
router.get('/getAllTitles', (req, res ) => {

  let col = db.getDB().collection('urls'); // Grab the collection

  for(let i = 0; i < req.query.urls.length; i++){
    req.query.urls[i] = req.query.urls[i].slice(0, req.query.urls[i].indexOf('&t=')); // Remove time from urls
  }

  col.find({url: { $in : req.query.urls} }).toArray(function(err, results){ // Return any results where the url us equal to a element inside the req.query.urls array
    if(err !== null){
      console.log(err);
    } else {
      if(results.length > 0){
          res.send({titles : results});
      }
    }
  });
});

export default router;
