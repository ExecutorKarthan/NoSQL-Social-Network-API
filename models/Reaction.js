//Import mongoose to make the schema
const { Schema } = require('mongoose');
const formatTime = require('../utils/timeFormatter')

//Create a schema for use in the Thought model
const reactionSchema = new Schema(
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
);

//Export the schema for us
module.exports = reactionSchema;
