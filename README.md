# city_explorer_api

**Author**: Scott Falbo
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
This is a backend server that:
1. Receives a request from the client.
2. Retrieves data from an api, or local json in this case.
3. Packages that data.
4. Responds to the front end with the requested object.

## Getting Started
To make this happen we will do the following:
  1. Install dependencies via npm. `express`, `cors`, `dotenv`
  2. Create a `server.js`.
  3. Bring in dependencies.
  4. Create routes for requests and responses.
  5. Retrieve the requested data and format it for front end templating via a constructor function.
  6. Respond to the request with the new object(s).
  7. Deploy to heroku to test with the [City Explorer](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/) front end

## Architecture
+ Node.js will be used along with:
  + `express` this does something
  + `cors`: this does also something
  + `dotenv` As I understand it now this while hold our API keys
  + `superagent` will be handling our `GET`
+ Node will allow the JavaScript to run as a server outside of a browser environment.
+ `server.js` is written in JavaScript and calls the above installed dependencies.
+ `.json` files are currently holding our mock information.
+ objects are prepared for use with `Mustache.js`

## Change Log

+ **Feature**: Locations
  + Estimated time: 60 minutes
  + Start time: 2:12pm
  + Finish time: 2:43pm
  + Actual time: 30 minutes
+ 10-15-2020 2:45pm - Server is talking to the front end and displaying location information

+ **Feature**: Weather
  + Estimated time: 45 minutes
  + Start time: 2:46pm
  + Finish time: 3:15pm
  + Actual time: 30 minutes
+ 10-15-2020 3:15pm - Application is displaying weather data

+ **Feature**: Errors
  + Estimated time: 45 minutes
  + Start time: 4:30pm
  + Finish time: 7:50pm
  + Actual time: 90 minutes cumulatively
+ 10-15-2020 7:50pm - I think the error thing will work once there is a way to check the input against something.

### October 17th , Class 07: Change Log:

+ **Feature**: Locations API
  + Estimated time: 30 minutes
  + Start time: 12:30pm
  + Finish time: 1:05pm
  + Actual time: 35 minutes
+ 10-17-2020 1:05pm - the location is being accessed from the locationIQ api instead of locally from the `.json` files.  Installed and refactored to use `superagent` to handle `.get` and `.use`

+ **Feature**: Weather API
  + Estimated time: 60 minutes
  + Start time: 1:30pm
  + Finish time: 2:25pm
  + Actual time: 55 minutes
+ 10-17-2020 - Figured out the weather api.  Learned about `.query()`.  The weather handler takes in the location request and returns 8 days of weather based on latitude and longitude.


+ **Feature**: Data Formatting
  + Estimated time: 30 minutes
  + Start time: 1:30pm
  + Finish time: 2:25pm
  + Actual time: 55 minutes
+ 10-17-2020 - Did this while I was refactoring the weather handler.  Replaced `.forEach()` with `.map()`.  Still a little confused on exactly what it's doing, looking forward to this weeks codes challenges.


+ **Feature**: Trails api
  + Estimated time: 45 minutes
  + Start time: 3:00pm
  + Finish time: 3:30pm
  + Actual time: 30 minutes
+ 10-17-2020 - Added the trails api.  Returns the top ten trails in the searched area by using the `request` latitude and longitude.  Same `.map()` sorting as the weather.

### October 22nd , Class 08: Change Log:

+ **Feature**: Database
  + Estimated time: 60 minutes
  + Start time: 10:00am
  + Finish time: 6:30pm
  + Actual time: about 2 hours on and off
+ 10-22-2020 - Added a database and tables in a `schema.sql`.  Brought `postgresql` into the server.

+ **Feature**: Server
  + Estimated time: 90 minutes
  + Start time: 7:00pm
  + Finish time: 9:00pm
  + Actual time: 2 hours
+ 10-22-2020 - Location information loads from cashed database if previously searched.  If not an API call is made and the object is cached.

+ Deployed to Heroku with live database.

### October 24nd , Class 08: Change Log:

+ **Feature**: Movies
  + Estimated time: 60 minutes
  + Start time: 1:30pm
  + Finish time: 2:10pm
  + Actual time: 40 minutes
+ 10-24-2020 - Getting movies back from the API, need to filter down the number of results.  Going to do other stuff and then circle back to docs.

+ **Feature**: Yelp
  + Estimated time: 60 minutes
  + Start time: 2:30pm
  + Finish time: 3:00
  + Actual time: 30 minutes
+ 10-24-2020 - Got the Yelp API hooked up and doing the things.


## Credits and Collaborations
+ Learned about the `dateToString()` method from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString) after trying a million ways of converting the `object` and trying to `splice` it.<br>
+ Working on the error message references the [301 class-06 demo code](https://github.com/codefellows/seattle-301n19/blob/master/class-06/demo/server/server.js).<br>
+ had some help from Amber Falbo on some tricks for the weather api URL.
+ [query wiki](https://en.wikipedia.org/wiki/Query_string) Read through this a bit.
