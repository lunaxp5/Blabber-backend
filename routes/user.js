const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/list", userController.list);

router.post("/", userController.save);

module.exports = router;
