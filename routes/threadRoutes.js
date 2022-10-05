const express = require('express');
const {
	createThreadView,
	createThread,
	threadView,
} = require('../controllers/threadsController');
const { authorized } = require('../utils/middlewares');
const router = express.Router();

router.get('/create', authorized, createThreadView);
router.post('/create', authorized, createThread);
router.get('/:id', authorized, threadView);

module.exports = router;
