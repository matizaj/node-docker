﻿const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
