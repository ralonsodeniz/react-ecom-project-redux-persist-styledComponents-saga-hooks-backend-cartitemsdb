const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify"); // this package is to enforce non https request our server can receive to be https

// this give node access to dotenv enviorment and .env files
if (process.env.NODE_ENV !== "production") require("dotenv").config();
// this gives back the stripe object we need to make charges
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(enforce.HTTPS({ trustProtoHeader: true })); // we pass the object option because this is needed by heroku
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // if we are in production we want to serve all the static files for production
  app.use(express.static(path.join(__dirname, "client/build")));
  // express.static() is the middlware to serve static files built in in express servers
  // path.join creates a path with the arguments we pass, __dirname is directory we are currently in and we add the route to our build folder
  // we create the REST API
  // now we are going to state what we serve depending on the route

  // in this case we are responding to any route "*"
  // we send the index.html file
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

// we add the endpoint for the service worker for our app to be a PWA (progressive web app)
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

// post() indicates that we are receiving something from the frontend
app.post("/payment", (req, res) => {
  // we are building the body of what we are going to send to stripe using what we get from the frontend
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "eur"
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
