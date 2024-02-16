//Import the required modules to function
const { Schema, model } = require('mongoose');
const formatTime = require('../utils/timeFormatter')

//Create a schema for defining thoughts
const thoughtSchema = new Schema(
  //Define thoughts attributes
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280, 
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatTime 
    },
    username: {
      type: String,
      required: true,
    },
    reactions:[
    //Create a schema for use in the Thought model
      new Schema(
        //Define the schema's attributes
        {
          reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280, 
          },
          username: 
          {
            type: String,
            required: true,
          },
          createdAt:
          {
            type: Date,
            default: Date.now(),
            get: formatTime 
          },
        },
        //Allow virutals to be used to alter how the data is displayed
        {
          toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
        }
      )],
  },
  //Allow virtuals to be used to alter how the data is displayed
  {
    toObject:{
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
 
//Create a virtual that will count how many reactions a thought has
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

//Load all of the previously reviewed properties into a model
const Thought = model('thought', thoughtSchema);

//Export the model for use
module.exports = Thought;
