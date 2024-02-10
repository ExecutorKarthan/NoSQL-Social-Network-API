//Import the required modules to function
const { Schema, model } = require('mongoose');

//Create a schema for defining users
const userSchema = new Schema(
  //Define user attributes
  {
    username: {
      type: String,
      unique: true,
      required: true, 
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true, 
      //Provide validation to ensure the supplied email is formatted properly
      match: [/^\w(\w+|(\.\w)|-\w|_\w)+\w@(\w|-)+(\.\w{2,3})$/],
    },
    thoughts: 
    [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }
    ],
    friends:
    [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    ],
  },
  //Allow virtuals to be used to alter how the data is displayed
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//Create a virtual that will count how many friends a user has
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

//Load all of the previously reviewed properties into a model
const User = model('user', userSchema);

//Export the model for use
module.exports = User;
