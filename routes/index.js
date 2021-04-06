const express = require('express');

const router = express.Router();
const projets = require('./projets');

router.use('/projets', projets);

module.exports = router;
