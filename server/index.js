/**
 * source: https://github.com/auth0-samples/auth0-react-samples/tree/master/Sample-01
 */
const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { auth0 } = require("../src/config.json");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = auth0.appOrigin || `http://localhost:${appPort}`;

if (
  !auth0.domain ||
  !auth0.audience ||
  auth0.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth0 is populated with valid domain and audience values"
  );

  process.exit();
}

app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0.domain}/.well-known/jwks.json`,
  }),

  audience: auth0.audience,
  issuer: `https://${auth0.domain}/`,
  algorithms: ["RS256"],
});

app.post("/", checkJwt, (req, res) => {
  console.log(req);
  res.send({
    msg: "Your access token was successfully validated!",
  });
});


app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
