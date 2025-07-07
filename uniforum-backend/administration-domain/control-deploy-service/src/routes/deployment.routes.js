const express = require('express');
const router = express.Router();
const deploymentController = require('../controllers/deployment.controller');

router.get('/deployments', deploymentController.getDeployments);
router.post('/deployments', deploymentController.createDeployment);

module.exports = router;
