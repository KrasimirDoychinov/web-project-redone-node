const express = require('express');
const {
	votes,
	updatePost,
	updateThread,
	updateAvatar,
	updateForumSignature,
} = require('./apiController');
const router = express.Router();

router.post('/votes', votes);
router.post('/updatePost', updatePost);
router.post('/updateThread', updateThread);
router.post('/updateAvatar', updateAvatar);
router.post('/updateForumSignature', updateForumSignature);

module.exports = router;
