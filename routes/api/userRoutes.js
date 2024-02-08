const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);


router.route('/:UserId').get(getSingleUser).delete(deleteUser);


module.exports = router;
