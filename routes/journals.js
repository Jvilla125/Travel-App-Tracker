const express = require('express');
const router = express.Router();
const journalsController = require('../controllers/journals')
const isLoggedIn = require('../config/auth');

router.post('/travels/:id/journals', journalsController.create);
router.put('/journals/:joid', journalsController.update);
router.delete('/travels/:id/journals/:joId', journalsController.delete);

module.exports = router;