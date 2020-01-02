'use strict';

const mongoose = require('mongoose');

/*
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description
});
*/

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