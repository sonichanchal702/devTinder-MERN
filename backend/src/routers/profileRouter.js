
const express = require("express");
const profileRouter = express.Router();
const { profileView, profileEdit, forgotPassword, resetPassword} = require("../controllers/userProfile");
const userAuth = require("../middleware/auth.middleware");


profileRouter.get("profile/view", userAuth, profileView);
profileRouter.patch("/profile/edit", userAuth, profileEdit);
profileRouter.patch("/profile/editPassword", userAuth, resetPassword);

module.exports = profileRouter;
