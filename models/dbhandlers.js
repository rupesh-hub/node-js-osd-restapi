const path = require("path");
const sqlite3 = require("better-sqlite3");

// Start db connection
const connect = async function () {
  try {
    const db = await new sqlite3(path.resolve("db/sampleAPI.db"), {
      fileMustExist: true,
    });
    return db;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllContinents: async function (req, res, next) {
    try {
      let db = await connect();
      let sql = "select * from continent";
      let query = db.prepare(sql);
      let rows = await query.all();
      return rows;
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  getAllCountries: async function (req, res, next) {
    try {
      let db = await connect();
      let sql = "select * from country";
      let query = db.prepare(sql);
      let rows = await query.all();
      return rows;
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  getAllCities: async function (req, res, next) {
    try {
      let db = await connect();
      let sql = "select * from city";
      let query = db.prepare(sql);
      let rows = await query.all();
      return rows;
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  getAllLanguages: async function (req, res, next) {
    try {
      let db = await connect();
      let sql = "select * from countrylanguage";
      let query = db.prepare(sql);
      let rows = await query.all();
      return rows;
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  postCity: async (req, res, next) => {
    const { name, countrycode, district, population } = req.body;
    try {
      let db = await connect();
      let sql =
        "INSERT INTO city (name, countryCode, district, population) VALUES (?,?,?,?)";
      let query = db.prepare(sql);
      let result = await query.run(name, countrycode, district, population);

      res.status(201).json({
        success: true,
        message: "City added successfully!",
        result,
      });
    } catch (error) {
      console.error("Database Error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Error adding city!",
          error: error.message,
        });
      }
    }
  },

  /* User management */
  registerUser: async function (req, res, next) {
    const { email, password, profile, bio, role } = req.body;
    if (!profile) {
      profile = "";
    }
    try {
      let db = await connect();
      let sql =
        "INSERT INTO user (email, password, profile, bio, role) VALUES (?,?,?,?, ?)";
      let query = db.prepare(sql);
      let result = await query.run(email, password, profile, bio, role);
      return { message: "User registered successfully!", result };
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  fetchUserByEmail: async function (req, res, next) {
    const { email } = req.body;
    try {
      let db = await connect();
      let sql = "SELECT * FROM user WHERE email =?";
      let query = db.prepare(sql);
      let row = await query.get(email);
      return row;
    } catch (error) {
      res.status(404).json(error.message);
    }
  },

  fetchRole: async (req, res, next) => {
    const { name } = req.body;
    try {
      let db = await connect();
      let sql = "SELECT * FROM role WHERE name = ?";
      let query = db.prepare(sql);
      let row = await query.get(name);
      return row;
    } catch (error) {
      console.error("Database Error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Error fetching role!",
          error: error.message,
        });
      }
    }
  },
};
