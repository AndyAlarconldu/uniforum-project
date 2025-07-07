const express = require('express');
const router = express.Router();
const controller = require('../controllers/ranking.controller');

router.get('/rankings', controller.getTopReputation);
router.get('/rankings/posts', controller.getTopPosts);
router.get('/rankings/likes', controller.getTopLikes);
router.post('/update/:user_id', controller.updateStats);

module.exports = router;
