const User = require("../model/User.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { validateEditProfileData } = require("../utils/validations");

const profileView = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const profileEdit = async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!");
    }

    const loggedInUser = req.user;

    // Handle flat fields normally
    const { socialLinks, ...flatFields } = req.body;

    Object.keys(flatFields).forEach(
      (key) => (loggedInUser[key] = flatFields[key])
    );

    // Handle socialLinks separately — deep merge so
    // existing links aren't wiped if only one is updated
    if (socialLinks) {
      loggedInUser.socialLinks = {
        ...((loggedInUser.socialLinks || {})),
        ...socialLinks,
      };
      // Mark as modified so Mongoose saves the nested object
      loggedInUser.markModified("socialLinks");
    }

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} Profile Updated Successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
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
      resetPasswordExpire: { $gt: Date.now() },
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

module.exports = { profileView, profileEdit, forgotPassword, resetPassword };