const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports = {
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.ThoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateSingleThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: `No thought with this id!` });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $push: {reactions: req.body} },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: `No thought with this id!` });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.ThoughtId})
      const deletedReaction = thought.reactions.id(req.params.ReactionId).deleteOne();
      await thought.save();
      
      if (!thought) {
        return res.status(404).json({ message: `No thought with this id!` });
      }

      res.json(deletedReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

}