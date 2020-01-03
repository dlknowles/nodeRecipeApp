'use strict';
  
module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    logRequestPaths: (req, res, next) => {
        console.log(`request made to: ${req.url}`);
        next();
    }
};