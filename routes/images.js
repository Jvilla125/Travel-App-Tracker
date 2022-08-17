const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/images')
const isLoggedIn = require('../config/auth');

router.post('/travels/:id/images', isLoggedIn, imagesController.create);
router.delete('/travels/:id/images/:imgId', isLoggedIn, imagesController.delete);


module.exports = router;