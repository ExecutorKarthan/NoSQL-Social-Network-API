const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { createUser } = require('./data');

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
  const reactions = []


  for (let i = 0; i < 5; i++) {
    console.log("Creating users")
    createUser(users, i)
    thoughts.push(users[i].thoughts)
    reactions.push(users[i].thoughts.reactions)
  }

  
  const userData = await User.insertMany(users);
 
  console.table(users);
  console.table(thoughts);
  console.table(reactions)
  console.info('Seeding complete!');
  process.exit(0);
});
