const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification.controller');

router.post('/notifications', controller.create);
router.get('/notifications/:user_id', controller.getByUser);
router.patch('/notifications/:id/read', controller.markAsRead);
router.delete('/notifications/:id', controller.delete);

module.exports = router;
