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
  let location = new Location(require('./data/location.json')[0], request.query.city);
  if (error500(request)){
    response.send(location);
  }
});

// ----- Weather route
app.get('/weather', (request, response) => {
  const forecastArray = [];
  let forecast = require('./data/weather.json');
  forecast.data.forEach(value => {
    forecastArray.push(new Weather(value));
  });
  if (error500(request)){
    response.send(forecastArray);
  }
});

// -------- 404 function
function error500(input){
  let checker = require(('./data/location.json'));
  checker.forEach(value => {
    let name = value.display_name;
    name = name.splice(0, name.indexOf(','));
    if (name.toLowerCase() === input.toLowerCase()){
      return true;
    }
  });
  return false;
}

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
