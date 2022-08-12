const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects')

router.get('/', projectController.index);

module.exports = router;