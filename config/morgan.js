const path = require('path');

const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const moment = require('moment-timezone');

const isProduction = process.env.NODE_ENV === 'production';


// Configure Morgan access logger

// Configure express requests logging
const morganAccessLogStream = rfs(function (time, index) {
    if (!time) return 'access.log';

    const now = moment();
    return 'access-' + now.format('YYYY-MM-DD') + '.log';
}, {
    immutable: true,
    initialRotation: true,
    interval: '1d', // rotate daily
    maxSize:
            '20M',
    path:
            path.join(__dirname, '../logs')
});
morgan.format('siteAL3C', function (tokens, req, res) {
    const now = moment();

    const returnString = [
        now.format('DD/MM/YYYY - HH:mm:ss -'),
        tokens.method(req, res), '-',
        tokens.url(req, res), '-',
        tokens.status(req, res), '-',
        tokens.res(req, res, 'content-length'), '-',
        tokens['user-agent'](req, res), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
    // Log info on console if in development
    if (!isProduction) console.log(returnString);
    return returnString;
});


// Re-export the morgan Logger
module.exports = morganAccessLogStream;
