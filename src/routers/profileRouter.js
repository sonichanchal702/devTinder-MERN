
const express = require("express");
const profileRouter = express.Router();
const { profile } = require("../controllers/userProfile");
const userAuth = require("../middleware/auth.middleware");

profileRouter.get("/profile", userAuth, profile);

module.exports = profileRouter;
