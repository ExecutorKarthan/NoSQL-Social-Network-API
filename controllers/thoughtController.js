//Import the needed modules
const { Thought } = require('../models');

//Create an export statement for the routes to be used
module.exports = {
  //Create a route to make a thought given JSON data
  async createThought(req, res) {
    //Attempt to create a thought with the supplied JSON data
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } 
    //If there is an error, report it here
    catch (err) {
      res.status(500).json(err);
    }
  },

  //Create a route that locates the data for all thoughts in the database
  async getThoughts(req, res) {
    try {
      //Attempt to find all thoughts and display the information as a single object
      const thoughts = await Thought.find()
      const thoughtObj = {
        thoughts,
      };
      res.json(thoughtObj);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create a route that locates the data for one thought, searching by the thought's ID
  async getSingleThought(req, res) {
    //Attempt to find the specified thought with their id value
    try {
      const thought = await Thought.findOne({ _id: req.params.ThoughtId })
        .select('-__v');
      //If the thought does not exist, return a error message
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }
      //If the thought is found, return their data in JSON
      res.json({
        thought,
      });
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Create a route to update the data of a single thought
  async updateSingleThought(req, res) {
    //Locate and update the thought by their id. Run validation to ensure the data is compliant with requirements
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      //If no thought is found, report it with a returned message
      if (!thought) {
        return res.status(404).json({ message: `No thought with this id!` });
      }
      //If the thought is found, return their data in JSON
      res.json(thought);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Create a route to add a reaction
  async createReaction(req, res) {
    //Locate a thought and push a reaction to its reactions field
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $push: {reactions: req.body} },
        { runValidators: true, new: true }
      );
      //If no thought is found, report that
      if (!thought) {
        return res.status(404).json({ message: `No thought with this id!` });
      }
      //If the thought is found, report their data in JSON
      res.json(thought);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Create a route to delete a reaction
  async deleteReaction(req, res) {
    //Locate the particular thought by its id, then delete the reaction by its id
    try {
      const thought = await Thought.findOne({_id: req.params.ThoughtId})
      //If no thought was found, provide that alert to the user
      if (!thought) {
        return res.status(404).json({ message: `No thought with this id!` });
      }
      const deletedReaction = thought.reactions.id(req.params.ReactionId).deleteOne();
      //Save the data change to the database
      await thought.save();
      //If the thought is found, report their data in JSON
      res.json(thought);
    } 
    //If there is an error, report it here
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

}