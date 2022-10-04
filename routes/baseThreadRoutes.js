const express = require('express');
const { baseThreadByIdView } = require('../controllers/baseThreadController');
const router = express.Router();

router.get('/:id', baseThreadByIdView);

module.exports = router;
