const express = require('express');
const router = express.Router();
const budgetsController = require('../controllers/budgets')
const isLoggedIn = require('../config/auth');

router.post('/travels/:id/budgets', isLoggedIn, budgetsController.create);
router.delete('/travels/:id/budgets/:budId', isLoggedIn, budgetsController.delete);

module.exports = router;