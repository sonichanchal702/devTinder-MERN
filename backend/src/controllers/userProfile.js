const User = require("../model/User.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");



const {validateEditProfileData}=require("../utils/validations");

const profileView= async(req ,res)=>
{ 
   try{
       const user=await User.findById(req.userId);
       res.send(user);
   }catch(err){
      res.status(400).send("Erraor:" + err.message);
   }
};

//Edit UserProfile  or Update
const profileEdit = async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({ // ← res.send ki jagah res.json use karo
      message: `${loggedInUser.firstName} Profile Updated Successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// forgot password API - update pwd
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    res.send(`Reset link: http://localhost:3000/reset/${resetToken}`);

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) throw new Error("Invalid or expired token");

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.send("Password reset successful!");

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports={profileView, profileEdit, forgotPassword, resetPassword};


