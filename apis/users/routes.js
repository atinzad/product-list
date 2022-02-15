const express = require("express");
const passport = require("passport");

const upload = require("../../middleware/multer");

const { signup, signin } = require("../../apis/users/controllers");

const router = express.Router();

router.post("/api/signup", signup);

router.post(
  "/api/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
