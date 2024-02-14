//Import modules for use
const { User } = require('../models');
const thoughtSchema = require('../models/Thought');

//Create an export statement for the routes to be used
module.exports = {
  //Create a route to make a user given JSON data
  async createUser(req, res) {
    //Attempt to create a user with the supplied JSON data
    try {
      const user = await User.create(req.body);
      res.json(user);
    } 
    //If there is an error, report it here
    catch (err) {
      res.status(500).json(err);
    }
  },
  
  //Create a route that locates the data for all users in the database
  async getUsers(req, res) {
    //Attempt to find all users and display the information as a single object
    try {
      const users = await User.find();
      res.json(users);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create a route that locates the data for one user, searching by the users' ID
  async getSingleUser(req, res) {
    //Attempt to find the specified user with their id value
    try {
      const user = await User.findOne({ _id: req.params.UserId })
        .select('-__v');
      //If the user does not exist, return a error message
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      //If the user is found, return their data in JSON
      res.json(
        user,
      );
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create a route to update the data of a single user
  async updateSingleUser(req, res) {
    //Locate and update the user by their id. Run validation to ensure the data is compliant with requirements
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      //If no user is found, report it with a returned message
      if (!user) {
        return res.status(404).json({ message: `No user with this id!` });
      }
      //If the user is found, return their data in JSON
      res.json(user);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Create a route to delete a user
  async deleteUser(req, res) {
    //Locate the user, delete any thoughts they created and then remove the user
    try {
      //Locate the user
      const userName = await User.findOne({_id: req.params.UserId})
      //Delete any thoughts pertaining to that username
      const thought = await thoughtSchema.deleteMany(
        { username: userName.username }
      );
      //Delete the user
      const user = await User.findOneAndRemove({ _id: req.params.UserId });
      //If the user is not found, provide a message
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      //If no thoughts are tied to that user, provide a notification
      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }
      //Verify the update was a success
      res.json({ message: 'User successfully deleted' });
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Create a route to add friends to a user
  async addFriend(req, res) {
    //Locate the user and add a user id as to the original user's friends list
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $push: { friends: req.params.FriendId } },
        { new: true }
      );
      //If no user is found, report that
      if (!user) {
        return res.status(404).json({ message: `No user to add the that friend to!` });
      }
      //If the user is found, report their data in JSON
      res.json(user);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Create a route to delete friends from a user's friend list
  async deleteFriend(req, res) {
    //Locate the friend's id from a user's friends list and then pull that entry from the list
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $pull: { friends: req.params.FriendId } },
        { new: true }
      );
      //If no user was found, provide that alert to the user
      if (!user) {
        return res.status(404).json({ message: `No user with that friend!` });
      }
      //If the user is found, report their data in JSON
      res.json(user);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}