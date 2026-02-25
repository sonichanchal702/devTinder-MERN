
const express = require("express");
const reqRouter = express.Router();
const userAuth = require("../middleware/auth.middleware");


const { sendConnectionRequest } = require("../controllers/sendConnectionRequest");
const { reviewConnectionRequest }=require("../controllers/reviewConnectionRequest");


reqRouter.post("/connectionReq/send/:status/:toUserId", userAuth, sendConnectionRequest);// post method is used to send the connection request and userAuth is used to authenticate the user before sending the connection request and sendConnectionRequest is the controller function which is used to send the connection request and it is imported from controllers folder and it is used to send the connection request to the user and it is used to save the connection request in the database and it is used to send the response to the user that connection request is sent successfully or not.
reqRouter.post("/connectionReq/review/:status/:requestId", userAuth, reviewConnectionRequest);// post method is used to review the connection request and userAuth is used to authenticate the user before reviewing the connection request and sendConnectionRequest is the controller function which is used to review the connection request and it is imported from controllers folder and it is used to review the connection request to the user and it is used to save the connection request in the database and it is used to send the response to the user that connection request is reviewed successfully or not.


module.exports = reqRouter;
