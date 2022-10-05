const express = require('express');
const { createPost } = require('../controllers/postController');
const { authorized } = require('../utils/middlewares');
const router = express.Router();

router.post('/create', authorized, createPost);

module.exports = router;
