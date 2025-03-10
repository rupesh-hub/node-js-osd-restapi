const bcrypt = require("bcrypt");
const db = require("../models/dbhandlers");
const generateTokenAndSetCookie = require("../util/helper");

// Register user
module.exports = {
  registerUser: async (req, res, next) => {
    const { email, password, confirmPassword, bio } = req.body;

    // Validate input
    if (!email || !password || !confirmPassword || !bio) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    try {
      // Check if user already exists
      const user = await db.fetchUserByEmail(req);
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exists with the provided email.",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      req.body.password = hashedPassword;

      // Insert user into database
      await db.registerUser(req);

      res.status(201).json({
        success: true,
        message: "User registered successfully.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  },

  authenticateUser: async (req, res, next) => {
    const { password } = req.body;
    try {
      const user = await db.fetchUserByEmail(req);

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials." });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials." });
      }

      const token = generateTokenAndSetCookie(res, user);

      res.json({
        success: true,
        message: "Login successful",
        access_token: token,
        user: {
          id: user._id,
          email: user.email,
          bio: user.bio,
        },
      });
    } catch (error) {}
  },
};
