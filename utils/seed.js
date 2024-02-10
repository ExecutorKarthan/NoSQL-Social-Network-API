//Import needed functions and models
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { createUser, createThoughts } = require('./data');

//Produce an error if there is a connection problem
connection.on('error', (err) => err);

//Create a database connection
connection.once('open', async () => {
  //Log a successful connection
  console.log('connected');
    //Determine if any data is in the database and then delete the data
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }
  //Create empty arrays to hold user and thought data
  const users = [];
  const thoughts = []

  //Use functions to populate the arrays with seed data objects
  for (let i = 0; i < 5; i++) {
    createUser(users, i)
  }
  for (let x = 0; x < 5; x++) {
    createThoughts(users, thoughts, x)
  }

  //Insert the user and thought data into the database
  const userData = await User.insertMany(users);
  const thoughtData = await Thought.insertMany(thoughts);

  //Find all the user and thought data in the database
  const allUsers = await User.find()
  const allThoughts = await Thought.find()
 
  //Link each user to its thought data, adding friends as well
  for(let val = 0; val < 5; val++){
    const currentUser = await User.findById(allUsers[val].id)
    currentUser.thoughts = allThoughts[val].id;
    currentUser.friends = allUsers[4-val].id;
    currentUser.save()
  }

  //Note the successful seeding and exit the process
  console.info('Seeding complete!');
  process.exit(0);
});
