const express = require("express");

const upload = require("../../middleware/multer");

const { signup } = require("../../apis/users/controllers");

const router = express.Router();

router.post("/apis/signup", signup);

module.exports = router;
