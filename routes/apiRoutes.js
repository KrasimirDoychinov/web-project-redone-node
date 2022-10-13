const express = require('express');
const {
	votes,
	updatePost,
	updateThread,
	updateAvatar,
} = require('../controllers/apiController');
const router = express.Router();

router.post('/votes', votes);
router.post('/updatePost', updatePost);
router.post('/updateThread', updateThread);
router.post('/updateAvatar', updateAvatar);

module.exports = router;
