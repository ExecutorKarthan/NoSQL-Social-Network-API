const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
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
    },
    username: {
      type: String,
      required: true,
    },
    // reactions:[reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema
  .virtual('getDate')
  .get(function() {
    return `${this.createdAt.toDateString()}`
  })

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
