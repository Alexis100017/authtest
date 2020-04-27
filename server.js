const express = require("express"); //library to create an api
require("dotenv").config(); //automatically give aaccess to env variables

const app = express(); //Instantiate of express

app.get("/public", function (req, res) {
  //first end point creation, it will be public and for each end point it will have a parameter which have request and response
  res.json({
    message: "We are in the public api", //response of the api
  });
});

app.listen(3001); //declare which port will listen on
console.log("api server listening on" + process.env.REACT_APP_API_URL);
