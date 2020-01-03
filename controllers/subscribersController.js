'use strict';

const Subscriber = require('../models/subscriber');

module.exports = {
    index: (req, res, next) => {
        Subscriber.find({})
            .then(subscribers => {
                res.locals.subscribers = subscribers;
                next();
            })
            .catch(error => {
                console.error(`Error fetching subscribers: ${error.message}`);
            });
    },
    indexView: (req, res) => {
        res.render("subscribers/index");
    },
    contactView: (req, res) => {
        res.render("contact/index");
    },
    saveSubscriber: (req, res) => {
        let newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        newSubscriber
            .save()
            .then(result => {
                res.render("contact/thanks");
            })
            .catch(error => {
                if (error) res.send(error);
            });
    }
};
