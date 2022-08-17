const express = require('express');
const router = express.Router();
const budgetsController = require('../controllers/budgets')
const isLoggedIn = require('../config/auth');

router.post('/travels/:id/budgets', isLoggedIn, budgetsController.create);
router.get('/budgets/:id/edit', isLoggedIn, budgetsController.edit);
router.put('/budgets/:id', isLoggedIn, budgetsController.update)
router.delete('/travels/:id/budgets/:budId', isLoggedIn, budgetsController.delete);

module.exports = router;