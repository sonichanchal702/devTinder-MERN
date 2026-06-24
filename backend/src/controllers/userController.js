const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");
const { validateSignupData } = require("../utils/validations");

// SIGN-UP
exports.signup = async (req, res) => {
  try {
    validateSignupData(req);
    const { email, password, firstName, lastName, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType: userType || "Developer",   // ← new field, safe default
    });

    res.status(201).json({ message: "Signup successfully" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password not found" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login Successfully", token });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully!");
};