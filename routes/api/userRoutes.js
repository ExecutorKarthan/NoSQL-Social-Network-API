//Import the router module for use
const router = require('express').Router();

//Define constants to store routing information
const {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    addFriend, 
    deleteFriend
} = require('../../controllers/userController');

//Define a URL for getting users from the database
router.route('/').get(getUsers).post(createUser);

//Define a URL for getting, updating or deleting a user
router
    .route('/:UserId')
    .get(getSingleUser)
    .put(updateSingleUser)
    .delete(deleteUser)

//Define a URL for adding or removing friends from a user
router
    .route('/:UserId/friends/:FriendId')
    .post(addFriend)
    .delete(deleteFriend)

//Export the module for use
module.exports = router;
