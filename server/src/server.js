// Importing node modules
import express from 'express';
import Promise from 'bluebird';
import { MongoClient } from 'mongodb';
import config from './config';
import bodyParser from 'body-parser';
import logger from 'morgan';

import db from './db';

// Importing source files
import links from './routes/Links.js';
// consts
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', links);

// Connect to Mongo on start
db.connect(config.database.url, (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, () => {
      console.log('Listening on port 3000...')
    })
  }
});
