const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SECRET_KEY"
    );

    req.userId = decoded.userId;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuth;
