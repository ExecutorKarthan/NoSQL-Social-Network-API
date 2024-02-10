//Import the mongoose module for use
const { connect, connection } = require('mongoose');

//Create a connection to the mongod database
connect('mongodb://127.0.0.1:27017/developersApplications');

//Export the file for use elsewhere in the app
module.exports = connection;
