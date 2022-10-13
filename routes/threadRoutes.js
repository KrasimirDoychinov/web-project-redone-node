const express = require('express');
const {
	createThreadView,
	createThread,
	threadView,
	deleteThread,
} = require('../controllers/threadController');
const { authorized, pagination } = require('../utils/middlewares');
const router = express.Router();

router.get('/create', authorized, createThreadView);
router.post('/create', authorized, createThread);
router.get('/:id', [authorized, pagination], threadView);
router.get('/delete/', authorized, deleteThread);

module.exports = router;
