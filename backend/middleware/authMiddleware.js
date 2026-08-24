const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;  // Get the authorization header from the request

    if (!authHeader) {
      return res.status(401).json({
        message: "Access token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(   //  Verify the access token using the secret key
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};

module.exports = protect;