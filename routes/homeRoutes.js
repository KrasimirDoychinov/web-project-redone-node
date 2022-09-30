const express = require('express');
const { homeView } = require('../controllers/homeController');
const { route } = require('./userRoutes');
const router = express.Router();

router.get('/', homeView);

module.exports = router;
