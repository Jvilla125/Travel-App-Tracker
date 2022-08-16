const express = require('express');
const router = express.Router();
const journalsController = require('../controllers/journals')
const isLoggedIn = require('../config/auth');

router.post('/travels/:id/journals', isLoggedIn, journalsController.create);
// router.get('/journals/:id/edit', isLoggedIn, journalsController.edit);
router.put('/journals/:id', isLoggedIn, journalsController.update);
router.delete('/travels/:id/journals/:joId', isLoggedIn, journalsController.delete);

module.exports = router;