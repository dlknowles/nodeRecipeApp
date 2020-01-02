'use strict';

const Course = require('../models/course');

exports.logRequestPaths = (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
};

exports.index = (req, res) => {
    res.render('index');
};

exports.showCourses = (req, res) => {
    res.render('courses', {
        offeredCourses: Course.getAllCourses()
    });
};