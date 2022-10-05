const express = require('express');
const { baseThreadByIdView } = require('../controllers/baseThreadController');
const { authorized } = require('../utils/middlewares');
const router = express.Router();

router.get('/:id', authorized, baseThreadByIdView);

module.exports = router;
