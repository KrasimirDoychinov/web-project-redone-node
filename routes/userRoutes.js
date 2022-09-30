const express = require('express');
const {
	registerView,
	loginView,
	registerUser,
} = require('../controllers/userController');
const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', registerUser);

module.exports = router;
