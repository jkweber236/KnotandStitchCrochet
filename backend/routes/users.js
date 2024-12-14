const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/:uid", usersController.getUser);

// Create a new user
router.post("/", usersController.createNewUser);

module.exports = router;
