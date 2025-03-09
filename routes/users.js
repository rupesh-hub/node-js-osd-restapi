const express = require("express");
const router = express.Router();

const con = require("../controllers/controllers");

/* GET user register ie send form */
router.get("/register", function (req, res, next) {
  res.render("register", {
    title: "Please Register",
    subtitle: "Follow the embedded cues",
  });
});

router.post("/register", con.registerUser, (req, res, next) => {
  // variables from middleware
  res.json({ login: "failed, please try again" });
});

router.get("/login", (req, res, next) => {
  res.render("login", {
    title: "Please Login",
  });
});

router.post("/login", con.authenticateUser, (req, res, next) => {
  res.json({ login: "failed, please try again" });
});

module.exports = router;
