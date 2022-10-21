const express = require('express');
const { createPost, deletePost } = require('./postController');
const { authorized } = require('../../utils/middlewares');
const router = express.Router();

router.post('/create', authorized, createPost);
router.get('/delete/:id', authorized, deletePost);

module.exports = router;
