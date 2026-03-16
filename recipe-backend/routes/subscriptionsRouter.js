const express = require('express');
const router = express.Router();
const subscriptionsController = require('../controllers/subscriptionsController');

router.post('/', subscriptionsController.subscribe);

module.exports = router;