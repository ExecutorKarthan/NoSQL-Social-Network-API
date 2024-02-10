//Import needed modules
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//Define route URLs
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

//Export the router for use
module.exports = router;
