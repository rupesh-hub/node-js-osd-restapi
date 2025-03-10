const express = require("express");
const router = express.Router();

const conw = require("../controllers/controllersworld");
const con = require("../controllers/controllers");
const authenticationMiddleware = require("../util/authentication.middleware");

const TITLE = "Rest API Pattern Project";

/* API endpoints */

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: TITLE,
    subtitle: "Front Page",
  });
});

/* GET continents */
router.get(
  "/continents",
  conw.getContinents,
  authenticationMiddleware,
  function (req, res) {
    // variables from middleware
    res.json({ continents: res.locals.continents });
  }
);

/* GET countries */
router.get(
  "/countries",
  conw.getCountries,
  authenticationMiddleware,
  function (req, res) {
    // variables from middleware
    res.json({ countries: res.locals.countries });
  }
);

/* GET cities */
router.get(
  "/cities",
  conw.getCities,
  authenticationMiddleware,
  function (req, res) {
    // variables from middleware
    // res.json({cities: res.locals.cities});
    res.render("cities", {
      title: TITLE,
      subtitle: "Cities",
      cities: res.locals.cities,
    });
  }
);

router.post(
  "/cities",
  conw.postCity,
  authenticationMiddleware,
  (req, res) => {
	
  }
);

/* GET languages */
router.get(
  "/languages",
  conw.getLanguages,
  authenticationMiddleware,
  function (req, res) {
    // variables from middleware
    res.json({ languages: res.locals.languages });
  }
);

module.exports = router;
