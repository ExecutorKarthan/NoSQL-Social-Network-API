const router = require('express').Router();
const {
    createThought,
    updateSingleThought,
    getThoughts,
    getSingleThought,
} = require('../../controllers/thoughtController');


router.route('/').get(getThoughts).post(createThought);


router.route('/:ThoughtId')
    .get(getSingleThought)
    .put(updateSingleThought);

module.exports = router;
