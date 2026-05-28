const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const token = req.header("Authorization");

    if (!token) {

      return res.status(401).json({
        message: "No token provided",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log(decoded);

    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Invalid token",
    });

  }

};

module.exports = authMiddleware;