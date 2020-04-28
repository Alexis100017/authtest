const express = require("express"); //library to create an api
require("dotenv").config(); //automatically give aaccess to env variables
const jwt = require("express-jwt"); // validates JWT and set req.user
const jwksRsa = require("jwks-rsa"); //retrieves RSA keys from a JSON web key set (JWKS) endpoint
const checkScope = require("express-jwt-authz"); //validate auth0 scopes
const checkJwt = jwt({
  //this validates that the information inside the JWT was genereated by auth0
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"],
});

const app = express(); //Instantiate of express
//checkJwt check the user JWT, if any of the parameters of this function fail the entire function fails as well
app.get("/private", checkJwt, function (req, res) {
  //first end point creation, it will be public and for each end point it will have a parameter which have request and response
  res.json({
    message: "We are in the private api", //response of the api
  });
});

app.get("/public", function (req, res) {
  //first end point creation, it will be public and for each end point it will have a parameter which have request and response
  res.json({
    message: "We are in the public api", //response of the api
  });
});

app.get("/courses", checkJwt, checkScope(["read:courses"]), function (
  req,
  res
) {
  //first end point creation, it will be public and for each end point it will have a parameter which have request and response
  res.json({
    courses: [
      { id: 1, tittle: "builidng apps with reddux" },
      { id: 1, tittle: "builidng apps with node js" },
    ], //response of the api
  });
});

app.listen(3001); //declare which port will listen on
console.log("api server listening on" + process.env.REACT_APP_API_URL);
