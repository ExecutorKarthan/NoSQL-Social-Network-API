const { Schema, Types } = require('mongoose');

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
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(), 
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
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema
  .virtual('formatTimestamp')
  .get(function(date) {
    return date.toLocaleDateString();
  })

//const Thought = model('thought', thoughtSchema);

module.exports = thoughtSchema;
