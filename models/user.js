const mongoose = require('mongoose'),
    { Schema } = mongoose;

const Subscriber = require('../models/subscriber');

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [ 10000, "Zip code too short" ],
        max: [ 99999, "Zip code too long" ]
    },
    password: {
        type: String,
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId, ref: "Course"
    }],
    subscribedAccount: {
        type: Schema.Types.ObjectId, ref: "Subscriber"
    }
},
{
    timestamps: true
});

userSchema.virtual("fullName")
    .get(function () {
        return `${this.name.first} ${this.name.last}`
    });

userSchema.pre("save", function(next) {
    let user = this;
    if (user.subscribedAccount === undefined) {
        Subscriber.findOne({
            email: user.email
        })
        .then(subsriber => {
            user.subscribedAccount = subsriber;
            next();
        })
        .catch(error => {
            console.log(`Error in connecting subscriber: ${error.message}`);
            next(error);
        })
    } else {
        next();
    }
});

module.exports = mongoose.model("Users", userSchema);