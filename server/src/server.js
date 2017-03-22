// Importing node modules
import express from 'express';
// Importing source files
import links from './routes/Links.js';
// consts
const app = express();

app.use('/', links);

// arrow functions
const server = app.listen(3000, () => {
	// destructuring
  const {address, port} = server.address();

  // string interpolation:
  console.log(`Example app listening at http://${address}:${port}`);
});
