const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips')
const isLoggedIn = require('../config/auth');

router.post('/travels/:id/trips', tripsController.create);

module.exports = router;