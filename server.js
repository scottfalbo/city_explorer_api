'use strict';

// ----- Dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// ----- Location route
app.get('/location', (request, response) => {
  try {
    let location = new Location(require('./data/location.json')[0], request.query.city);
    response.send(location);
  }
  catch(error){
    console.log('ERROR', error);
    response.status(500).send('So sorry, something went wrong.');
  }
});

// ----- Weather route
app.get('/weather', (request, response) => {
  const forecastArray = [];
  let forecast = require('./data/weather.json');
  forecast.data.forEach(value => {
    forecastArray.push(new Weather(value));
  });
  response.send(forecastArray);
});


// ----- Location constructor
function Location(obj, query){
  this.search_query = query;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

// ----- Weather constructor
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.valid_date).toDateString();
}

app.listen(PORT, () => {
  // start the server
});
