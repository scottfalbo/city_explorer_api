'use strict';

// ----- Dependencies
const express = require('express');
const pg = require('pg');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');
const { response } = require('express');
// const { response } = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);

// ----- Routes
app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);

app.use('*', notFound);

// --------------- Location Handler
function handleLocation(request, response){
  let city = request.query.city;
  let key = process.env.GEOCODE_API_KEY;

  const checkSQL = `SELECT * FROM location`;
  client.query(checkSQL)
    .then(data => {
      let dataCheck = data.rows.filter(value => value.search_query === city);
      if (dataCheck[0]){
        response.status(200).send(dataCheck[0]);
      } else {
        const URL = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
        superagent.get(URL)
          .then(data => {
            let location =new Location(data.body[0], city);
            response.status(200).send(location);

            const SQL = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4) RETURNING *';
            const safeValues = [location.search_query, location.formatted_query, location.latitude, location.longitude];
            client.query(SQL, safeValues)
              .then(data => {
                //store data
              });
          });
      }
    })
    .catch( error => {
      // console.log('Error', error);
      response.status(500).send('Something went wrong');
    });
}

// function error500(error){
//   console.log('Error Message:', error);
//   return response.status(500).send('function message');
// }

//--------------------- Weather handler
function handleWeather(request, response){
  let parameters = {
    key: process.env.WEATHER_API_KEY,
    lat: request.query.latitude,
    lon: request.query.longitude,
    days: 8
  };
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily`;
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
      // console.log(error);
    });
}

// -------------------- Trails Handler
function handleTrails(request, response){
  let parameters = {
    key: process.env.TRAIL_API_KEY,
    lat: request.query.latitude,
    lon: request.query.longitude,
    maxResults: 10
  };
  const URL = `https://www.hikingproject.com/data/get-trails`;
  superagent.get(URL)
    .query(parameters)
    .then(value => {
      let trails = value.body.trails.map(newTrail => {
        return new Trails(newTrail);
      });
      response.status(200).send(trails);
    }).catch(error => {
      response.status(500).send('Poop, something went wrong, ...');
      // console.log(error);
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

//-------- Trails Constructor
function Trails(obj){
  this.name = obj.name;
  this.location = obj.location;
  this.length = obj.length;
  this.stars = obj.stars;
  this.star_votes = obj.starVotes;
  this.summary = obj.summary;
  this.trail_url = obj.url;
  this.conditions = obj.conditionDetails;
  this.condition_date = obj.conditionDate;
  this.condition_time = obj.condition_time;
}

function notFound(request, response) {
  response.status(404).send(`Couldn't load the thing into the thing from the other thing`);
}

// ------------------------- Connect to database
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`It's Alive!`);
    });
  })
  .catch(error => {
    console.log('error message:', error);
  });

// ----------------- Start Server
// app.listen(PORT, () => {
//   console.log(`It's Alive!!!`);
// });
