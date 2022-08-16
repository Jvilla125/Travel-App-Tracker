const express = require('express');
const router = express.Router();
const travelsController = require('../controllers/travels')
const isLoggedIn = require('../config/auth');

router.get('/', travelsController.index);
router.get('/new', isLoggedIn, travelsController.new);
router.get('/:id', travelsController.show);
router.post('/', isLoggedIn, travelsController.create);
router.delete('/:id', isLoggedIn, travelsController.delete);

module.exports = router;