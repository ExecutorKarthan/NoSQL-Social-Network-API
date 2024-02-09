const router = require('express').Router();
const {
    createThought,
    updateSingleThought,
    getThoughts,
    getSingleThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


router.route('/').get(getThoughts).post(createThought);


router.route('/:ThoughtId')
    .get(getSingleThought)
    .put(updateSingleThought)
    .post(createReaction)

router.route('/:ThoughtId/reactions/:ReactionId')
    .delete(deleteReaction)

module.exports = router;
