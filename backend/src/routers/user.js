const express=require("express");
const userRouter=express.Router();
const userAuth=require("../middleware/auth.middleware");
const {getProfile}=require("../controllers/getProfile");
const {getPendingConnectionRequest}=require("../controllers/getPendingConnectionRequest");  

userRouter.get("/profile",userAuth,getProfile);
userRouter.get("/profile/request/recieved",userAuth,getPendingConnectionRequest);
module.exports=userRouter;