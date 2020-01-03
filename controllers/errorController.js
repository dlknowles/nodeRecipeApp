'use strict';

const httpStatus = require('http-status-codes');

module.exports = {
    logErrors: (error, req, res, next) => {
        console.error(error.stack);
        next(error);
    },
    respondNoResourceFound: (req, res) => {
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        //res.send(`${errorCode} | The page does not exist!`);
        res.sendFile(`./public/${errorCode}.html`, { root: "./" });
    },
    respondInternalError: (error, req, res, next) => {
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        console.error(`ERROR occurred: ${error.stack}`);
        res.status(errorCode);
        // res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
        res.sendFile(`./public/${errorCode}.html`, { root: "./" });
    }
};