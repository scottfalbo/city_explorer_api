'use strict';

// ----- Dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// app.get('/', (request, response) => {
//   response.send('Hello');
// });
app.get('/location', (request, response) => {
  let location = new Location(require('./data/location.json')[0], request.query.city);
  response.send(location);
});

function Location(obj, query){
  this.search_query = query;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}





app.listen(PORT, () => {
  // start the server
});
