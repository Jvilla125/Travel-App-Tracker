const express = require('express');
const router = express.Router();
const journalsController = require('../controllers/journals')
const isLoggedIn = require('../config/auth');

router.post('/travels/:id/journals', journalsController.create);

module.exports = router;