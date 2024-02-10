//Import needed modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//Allow remote env to generate the port or use 3001 as a default
const PORT = process.env.PORT || 3001;

//Define express for use
const app = express();

//Use express to determine encoding, use json and establish routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Connect to the database and log the connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server online on port ${PORT}!`);
  });
});
