const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;

router.post("/register", userController.register);
router.get("/getUser", userController.getUser);

module.exports = router;
