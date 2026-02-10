
const express = require("express");
const reqRouter = express.Router();
const userAuth = require("../middleware/auth.middleware");
const { sendConnectionRequest } = require("../controllers/sendConnectionReq");

reqRouter.post("/sendConnectionReq", userAuth, sendConnectionRequest);

module.exports = reqRouter;
