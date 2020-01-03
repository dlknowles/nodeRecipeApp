'use strict';

const mongoose = require('mongoose'),
    express = require('express'),
    layouts = require('express-ejs-layouts');

const errorController = require('./controllers/errorController'),
    homeController = require("./controllers/homeController"),
    subscribersController = require('./controllers/subscribersController'),
    usersController = require('./controllers/usersController'),
    coursesController = require('./controllers/coursesController');

// connect to db
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true });

mongoose.set("useCreateIndex", true);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// set up express app
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

// set up routes
app.get("/", homeController.index);
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/contact", subscribersController.contactView);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers", subscribersController.index, subscribersController.indexView);
app.get("/users", usersController.index, usersController.indexView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// run the app
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});