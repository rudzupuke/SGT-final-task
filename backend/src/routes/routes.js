const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const buddiesController = require("../controllers/buddiesController");
const signup = require("../controllers/signupController");
const login = require("../controllers/loginController");

router.post("/addbuddy", buddiesController.addBuddy);
router.get("/buddies", buddiesController.getBuddies);

router.get("/users", usersController.getUsers);
router.get("/users/:userId", usersController.getUser);

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
