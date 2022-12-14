const express = require('express');
const { baseThreadByIdView } = require('./baseThreadController');
const { authorized, pagination } = require('../../utils/middlewares');
const router = express.Router();

router.get('/:id', [authorized, pagination], baseThreadByIdView);

module.exports = router;
