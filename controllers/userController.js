const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
const thoughtSchema = require('../models/Thought');


module.exports = {
    // create a new student
    async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        friendCount: await friendCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleStudent(req, res) {
    try {
      const user = await User.findOne({ username: req.params.username })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
        friendCount: await friendCount(req.params.username),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ username: req.params.username });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await thoughtSchema.findOneAndUpdate(
        { thoughts: req.params.username },
        { $pull: { thoughts: req.params.username } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

}