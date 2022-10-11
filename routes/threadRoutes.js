const express = require('express');
const {
	createThreadView,
	createThread,
	threadView,
	deleteThread,
} = require('../controllers/threadController');
const { authorized } = require('../utils/middlewares');
const router = express.Router();

router.get('/create', authorized, createThreadView);
router.post('/create', authorized, createThread);
router.get('/:id', authorized, threadView);
router.get('/delete/:id', authorized, deleteThread);

module.exports = router;
