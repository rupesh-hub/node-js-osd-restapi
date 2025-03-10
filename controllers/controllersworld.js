const models = require("../models/dbhandlers");

module.exports = {
  getContinents: async function (req, res, next) {
    let rows = await models.getAllContinents(req, res, next);
    res.locals.continents = rows;
    next();
  },

  getCountries: async function (req, res, next) {
    let rows = await models.getAllCountries(req, res, next);
    res.locals.countries = rows;
    next();
  },

  getCities: async function (req, res, next) {
    let rows = await models.getAllCities(req, res, next);
    res.locals.cities = rows;
    next();
  },

  postCity: async (req, res, next) => {
    const { name, countrycode, district, population } = req.body;

    try {
      if (!name || !countrycode || !district || !population) {
        return res.status(400).json({
          success: false,
          message: "All fields are required!",
        });
      }

      await models.postCity(req, res, next);

      res
        .status(201)
        .json({ 
			success: true, 
			message: "City added successfully!" 
		});
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({
        success: false,
        message: "Server error! Error adding new city.",
      });
    }
  },

  getLanguages: async function (req, res, next) {
    let rows = await models.getAllLanguages(req, res, next);
    res.locals.languages = rows;
    next();
  },
};
