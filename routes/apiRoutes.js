const express = require('express');
const { votes } = require('../controllers/apiController');
const router = express.Router();

router.post('/votes', votes);

module.exports = router;
