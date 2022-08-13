const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trips')

router.get('/', tripController.index);

module.exports = router;