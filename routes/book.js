const express = require("express");
const passport = require('passport');
const router = express.Router();
const Book = require("../models/book");
const ensureLogin = require("connect-ensure-login");

router.get("/finder", (req, res, next) => {
  res.render("book/finder", { "message": req.flash("error") });
});

module.exports = router;