const express = require('express');
const { votes, updatePost } = require('../controllers/apiController');
const router = express.Router();

router.post('/votes', votes);
router.post('/updatePost', updatePost);

module.exports = router;
