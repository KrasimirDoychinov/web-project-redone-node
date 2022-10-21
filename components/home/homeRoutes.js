const express = require('express');
const { homeView } = require('./homeController');
const router = express.Router();

router.get('/', homeView);

module.exports = router;
