const express = require('express');
const router = express.Router();
const controller = require('../controllers/reaction.controller');

router.post('/', controller.createOrUpdateReaction);
router.delete('/', controller.deleteReaction);
router.get('/:target_id', controller.getSummary);

module.exports = router;
