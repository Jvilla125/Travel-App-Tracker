const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trips')
const isLoggedIn = require('../config/auth');

router.get('/', tripController.index);

module.exports = router;