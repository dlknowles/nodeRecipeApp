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
const app = express(),
    router = express.Router();

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
app.use("/", router);

// set up routes
router.get("/", homeController.index);
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/contact", subscribersController.contactView);
router.post("/subscribe", subscribersController.saveSubscriber);
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// run the app
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});