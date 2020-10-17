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
      response.status(200).send(location);
    }).catch(error => {
      response.status(500).send('Poop, something went wrong, ...');
      console.log(error);
    });
}

//--------------------- Weather handler
function handleWeather(request, response){
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily`;
  let parameters = {
    key: process.env.WEATHER_API_KEY,
    lat: request.query.latitude,
    lon: request.query.longitude,
    days: 8
  };
  superagent.get(URL)
    .query(parameters)
    .then(value => {
      let forecast = value.body;
      let weatherArray = forecast.data.map(daily => {
        return new Weather(daily);
      });
      response.status(200).send(weatherArray);
    }).catch(error => {
      response.status(500).send('Poop, something went wrong, ...');
      console.log(error);
    });
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
  response.status(404).send(`Couldn't load the thing into the thing from the other thing`);
}

app.listen(PORT, () => {
  console.log(`It's Alive!`);
});
