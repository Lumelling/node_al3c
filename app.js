'use strict';
// NODE.JS


const path = require("path");

const morgan = require('morgan');
const morganAccessLogStream = require("./config/morgan.js");

// ENVIRONMENT VARIABLES
global.appRoot = path.resolve(__dirname);

// LIBRARIES
const http = require("http");
//Express
const express = require("express");
const session = require("express-session");
const errorhandler = require("errorhandler");
const cors = require("cors");

const bodyParser = require("body-parser");
const bluebird = require("bluebird");
require('dotenv').config();


// Create global app object
let app = express();
app.disable('etag');
//CORS Access
app.use(cors({

    origin: true,
    credentials: true,
    methods: "GET,HEAD,PUT,POST,DELETE",
    allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
    preflightContinue: false,
    optionsSuccessStatus: 204

}));

//use our own defined log middleware logger
app.use(morgan('siteAL3C', {stream: morganAccessLogStream}));


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

// ROUTES
app.use(require('./routes'));

//websocket
const serverhttp = http.createServer(app);

/// catch 404 and forward to error handler

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    err.message = req.originalUrl + ' : Not Found';
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
        'error': {
            message: err.message,
            status: err.status,
            error: err
        }
    });
});


let server = serverhttp.listen(process.env.PORT || 3030, function () {
    console.log('Listening on port ' + server.address().port);
    Object.keys(process.env).forEach(function (key) {
        if (key.startsWith('MONGO') || key.startsWith('NODE') || key.startsWith('MAIL_')) {
            console.log(key + ' : ' + process.env[key]);
        }
    });
});

module.exports = server;
