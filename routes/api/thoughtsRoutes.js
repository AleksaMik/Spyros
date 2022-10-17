const router = require ('express').Router();

const {
    getThoughtsbyId,
    getAllThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require ('../../controllers/thoughts-controller');

router.route('/').get(getThoughtsbyId).put(updateThoughts).delete(deleteThoughts);

router.route('/').get(getAllThoughts);

router.route('/userId').post(createThoughts);

router.route('/:thoughtId/reaction').post(addReaction);

router.route ('/:thoughtsId/reactions/:reactionId').delete(deleteReaction);

module.export = router;

