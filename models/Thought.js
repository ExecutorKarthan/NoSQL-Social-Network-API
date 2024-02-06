const { Schema, model } = require('mongoose');

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
    username:
    {
      type: String,
      required: true,
    },
    reactions:
    [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  },
);

thoughtSchema
  .virtual('reactionSchema')
  .get(function () {
    const reactionSchema = new Schema(
      {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: new Schema.Types.ObjectId(), 
        },
        reactionBody: {
          type: String,
          required: true,
          maxLength: 280,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
      },
    ); 
    reactionSchema
      .virtual('formatTimestamp')
      .get(function(date) {
        return date.toLocaleDateString();
      })  
  })
  .virtual('formatTimestamp')
  .get(function(date) {
    return date.toLocaleDateString();
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
