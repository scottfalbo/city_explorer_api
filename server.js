'use strict';

// ----- Dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');
// const { response } = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());


// ----- Routes
app.get('/location', handleLocation);
app.get('/weather', handleWeather);

app.use('*', notFound);

// --------------- Location Handler
function handleLocation(request, response){
  let city = request.query.city;
  let key = process.env.GEOCODE_API_KEY;

  const URL = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;

  superagent.get(URL)
    .then(data => {
      let location =new Location(data.body[0], city);
      console.log(location);
      response.status(200).send(location);
    }).catch(error => {
      response.status(500).send('Poop, something went wrong, ...');
      console.log(error);
    });
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

function notFound(request, response) {
  response.status(404).send('nope');
}

app.listen(PORT, () => {
  console.log(`It's Alive!`);
});
