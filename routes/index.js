const express = require('express');

const router = express.Router();
const projets = require('./projets');
const participants = require('./participants');

router.use('/projets', projets);
router.use('/participants', participants);

module.exports = router;
