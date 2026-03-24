const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const User = require("../model/User.model");
const {validateSignupData}= require("../utils/validations");
const authRouter = require("../routers/authRouter");


// SIGN-UP
exports.signup = async (req, res) => {
  try{

  validateSignupData(req);// utils validation.js call
 const { email, password, firstName, lastName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);  // it take 10 hashing round on the password for the protect from attackers
  
await User.create({ firstName, lastName, email, password: hashedPassword });

  res.status(201).json({ message: "Signup successfully" });

}catch(error){
      res.status(400).json({Error:error.message});
}
};


// LogIn
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

    // ✅ _id use karo
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1h" }
    );

    // ✅ sameSite lax
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

//Logout api

exports.logout=async(req,res)=>{

    res.cookie("token", null, {
      expires:new Date(Date.now()),
    });
    res.send("Logout Successfully!");

};
