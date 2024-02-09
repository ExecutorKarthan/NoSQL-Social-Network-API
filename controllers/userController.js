const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
const thoughtSchema = require('../models/Thought');


module.exports = {
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
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.UserId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateSingleUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: `No user with this id!` });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const userName = await User.findOne({_id: req.params.UserId})

      console.log(userName)

      const thought = await thoughtSchema.deleteMany(
        { username: userName.username }
      );

      const user = await User.findOneAndRemove({ _id: req.params.UserId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

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

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $push: { friends: req.params.FriendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: `No user to add the that friend to!` });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $pull: { friends: req.params.FriendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: `No user with that friend!` });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}