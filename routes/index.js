const express = require('express');

const router = express.Router();
const projets = require('./projets');

router.use('/api', projets);

module.exports = router;
