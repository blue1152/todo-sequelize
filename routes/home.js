// routes/user.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
// 載入 user model
const db = require("../models");
const User = db.User;

// 首頁
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
