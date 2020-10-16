'use strict';

// ----- Dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { response } = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());


// ----- Routes
app.get('/weather', handleWeather);
app.get('/location', handleLocation);

//------------------- Location Handler
function handleLocation( request, response){
  try {
    let location = new Location(require('./data/location.json')[0], request.query.city);
    response.send(location);
  }
  catch(error){
    error500();
  }
}
//--------------------- Weather handler
function handleWeather(request, response){
  try {
    const forecastArray = [];
    let forecast = require('./data/weather.json');
    forecast.data.forEach(value => {
      forecastArray.push(new Weather(value));
    });
    response.send(forecastArray);
  }
  catch(error){
    error500();
  }
}
// ----------------------- Error 500
function error500(){
  return response.status(500).send('Sorry, something went wrong, ...');
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
  console.log(`It's Alive!`);
});
