const express = require('express');

const router = express.Router();

const projetController = require('../controllers/projets');

const moment = require('moment');


/**
 * test
 */
router.get('', function (req, res, next) {
        return res.status(200).json({'ok': 'ok'});

});

module.exports = router;
