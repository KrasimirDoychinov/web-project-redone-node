const express = require('express');
const router = express.Router();
const {
	registerView,
	loginView,
	registerUser,
	loginUser,
	logoutUser,
} = require('./authController');

router.get('/register', registerView);
router.get('/login', loginView);
router.get('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
