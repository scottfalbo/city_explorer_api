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
+ Node will allow the JavaScript to run as a server outside of a browser environment.
+ `server.js` is written in JavaScript and calls the above installed dependencies.
+ `.json` files are currently holding our mock information.
+ 
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->
`dateToString()`
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString



+ **Feature**: Locations
  + Estimated time: 60 minutes
  + Start time: 2:12pm
  + Finish time: 2:43pm
  + Actual time: 30 minutes


+ **Feature**: Weather
  + Estimated time: 45 minutes
  + Start time: 2:46pm
  + Finish time: 3:15pm
  + Actual time: 30 minutes


+ **Feature**: Errors
  + Estimated time: 45 minutes
  + Start time: 4:30pm
  + Finish time: 
  + Actual time: 