const express = require("express");
const reqRouter = express.Router();
const userAuth = require("../middleware/auth.middleware");

const { sendConnectionRequest } = require("../controllers/sendConnectionRequest");
const { reviewConnectionRequest }=require("../controllers/reviewConnectionRequest");

reqRouter.post("/connectionReq/send/:status/:toUserId", userAuth, sendConnectionRequest);
reqRouter.post("/connectionReq/review/:status/:requestId", userAuth, reviewConnectionRequest);

module.exports = reqRouter;
