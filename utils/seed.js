const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { createUser, createThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

  const users = [];
  const thoughts = []


  for (let i = 0; i < 5; i++) {
    console.log("Creating users")
    createUser(users, i)
  }
  
  for (let x = 0; x < 5; x++) {
    console.log("Creating thoughts")
    createThoughts(users, thoughts, x)
  }

  const userData = await User.insertMany(users);

  const thoughtData = await Thought.insertMany(thoughts);

  const allUsers = await User.find()

  const allThoughts = await Thought.find()
 
  for(let val = 0; val < 5; val++){
    const currentUser = await User.findById(allUsers[val].id)
    currentUser.thoughts = allThoughts[val].id;
    currentUser.friends = allUsers[4-val].id;
    currentUser.save()
  }

  // console.table(users);
  // console.table(thoughts);
  console.log(allUsers)
  console.log(allThoughts)
  //console.table(reactions)
  console.info('Seeding complete!');
  process.exit(0);
});
