'use strict';

const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    items: [],
    zipCode: {
        type: Number,
        min: [10000, "Zip code is too short"],
        max: [99999, "Zip code is too long"]
    }
});

/*
var courses = [
    {
        title: 'Event Driven Cakes',
        cost: 50
    },
    {
        title: "Asynchronous Artichoke",
        cost: 25
    },
    {
        title: "Object Oriented Orange Juice",
        cost: 10
    }
];

exports.getAllCourses = () => {
    return courses;
};

*/

module.exports = mongoose.model("Course", courseSchema);