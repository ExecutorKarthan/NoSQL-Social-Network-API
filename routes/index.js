//Import the router module for use
const router = require('express').Router();

//Define a URL for the API routes
const apiRoutes = require('./api');

//Specify the URL for the API route
router.use('/api', apiRoutes);

//If an incorrect URL was use
router.use((req, res) => {
  return res.send('Wrong route!');
});

//Export the module for use
module.exports = router;
