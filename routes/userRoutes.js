const express = require('express');
const { profileView } = require('../controllers/userController');
const { authorized, pagination } = require('../utils/middlewares');
const router = express.Router();

router.get('/profile', [authorized, pagination], profileView);

module.exports = router;
