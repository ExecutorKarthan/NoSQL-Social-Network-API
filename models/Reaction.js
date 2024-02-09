const { Schema } = require('mongoose');

const reactionSchema = new Schema(
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
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

reactionSchema
  .virtual('getDate')
  .get(function() {
    return `${this.createdAt.toDateString()}`
  })

module.exports = reactionSchema;
