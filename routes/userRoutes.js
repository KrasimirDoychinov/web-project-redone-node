const express = require('express');
const router = express.Router();
const {
	registerView,
	loginView,
	registerUser,
	loginUser,
} = require('../controllers/userController');
const { setTitle } = require('../utils/utils');

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
