const express=require("express");
const userRouter=express.Router();
const userAuth=require("../middleware/auth.middleware");
const {getProfile}=require("../controllers/getProfile");
const {getPendingConnectionRequest}=require("../controllers/getPendingConnectionRequest");  
const { getFeed } = require("../controllers/feedController");
const { getConnections } = require("../controllers/getConnections");
const { getChat } = require("../controllers/getChat");
const { createOrder, verifyPayment } = require("../controllers/payment");

userRouter.get("/premium/verify", userAuth, async (req, res) => {
  res.json({ isPremium: req.user.isPremium || false });
});
userRouter.get("/chat/:targetUserId", userAuth, getChat);
userRouter.get("/connections", userAuth, getConnections);
userRouter.get("/profile",userAuth,getProfile);
userRouter.get("/profile/request/recieved",userAuth,getPendingConnectionRequest);
userRouter.get("/feed",userAuth,getFeed);

module.exports=userRouter;