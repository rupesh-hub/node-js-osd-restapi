const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const token = req.cookies?.access_token;

  console.log("Authentication middleware called : " + JSON.stringify(token));

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Please login first.",
    });
  }

  try {
    if(!process.env.SECRET_KEY) {
        console.error("Secret key is missing!");
        return res.status(500).json({
            success: false,
            message: "Server error! Missing secret key.",
        });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`Full token verification failed {}`, error);

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Unauthorized: Token has expired"
          : "Unauthorized: Invalid token",
    });
  }
};

module.exports = authenticationMiddleware;