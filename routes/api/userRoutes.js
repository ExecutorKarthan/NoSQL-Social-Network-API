const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    addFriend, 
    deleteFriend
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);


router
    .route('/:UserId')
    .get(getSingleUser)
    .post(updateSingleUser)
    .delete(deleteUser)

router
    .route('/:UserId/friends/:UserId')
    .post(addFriend)
    .delete(deleteFriend)
    
module.exports = router;
