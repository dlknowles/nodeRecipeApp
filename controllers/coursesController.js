const Course = require('../models/course');

module.exports = {
    index: (req, res, next) => {
        Course.find({})
            .then(courses => {
                res.locals.offeredCourses = courses;
                next();
            })
            .catch(error => {
                console.error(`Error fetching courses: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("courses/index");
    }
};