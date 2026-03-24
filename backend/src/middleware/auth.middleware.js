const jwt = require("jsonwebtoken");
const User = require("../model/User.model");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token ||
                  req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

    const user = await User.findById(decoded._id); // ← fix yahan hai

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    req.user = user;
    req.userId = user._id;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuth;