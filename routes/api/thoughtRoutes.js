//Import the router module for use
const router = require('express').Router();

//Define constants to store routing information
const {
    createThought,
    updateSingleThought,
    getThoughts,
    getSingleThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//Define a URL for getting thoughts from the database
router.route('/').get(getThoughts).post(createThought);

//Define a URL for getting or updating a thought
router.route('/:ThoughtId')
    .get(getSingleThought)
    .put(updateSingleThought)
    .delete(deleteThought)

//Define a URL for creating a reaction
router.route('/:ThoughtId/reactions')
    .post(createReaction)

//Define a URL for deleting reactions
router.route('/:ThoughtId/reactions/:ReactionId')
    .delete(deleteReaction)

//Export the module for use
module.exports = router;
