const express = require('express');
const {
	votes,
	updatePost,
	updateThread,
} = require('../controllers/apiController');
const router = express.Router();

router.post('/votes', votes);
router.post('/updatePost', updatePost);
router.post('/updateThread', updateThread);

module.exports = router;
