'use strict';

// ----- Dependencies
const express = require('express');
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// app.get('/', (request, response) => {
//   response.send('Hello');
// });
app.get('/locations', (request, reponse) => {
  let location = new Location(require('./data/location.json')[0], request.query.city);
  response.send(location);
});

function Location(obj, query){
  this.query = query;
  this.formattedQuery = obj.display_name;
  this.lat = obj.lat;
  this.lon = obj.lon;
}





app.listen(PORT, () => {
  // start the server
});
