const express = require('express');
const { profileView } = require('../controllers/userController');
const { authorized } = require('../utils/middlewares');
const router = express.Router();

router.get('/profile', authorized, profileView);

module.exports = router;
