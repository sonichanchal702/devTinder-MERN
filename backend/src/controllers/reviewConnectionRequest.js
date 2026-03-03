
const User = require("../model/User.model");
const ConnectionRequestModel = require("../model/ConnectionRequest.model.js");

const reviewConnectionRequest= async(req,res)=>{
    try{
        const loggedInUser=req.userId;
        const{status, requestId}=req.params;

        const allowedStatus=["accepted", "rejected"];

        if(!allowedStatus.includes(status))
        {
            return res.status(400).json({message:"Invalid status"});
        }

        const connectionRequest=await ConnectionRequestModel.findById(requestId);

        if(!connectionRequest)
        {
            return res.status(404).json({message:"Connection request not found"});
        }
        if(connectionRequest.toUserId.toString()!==loggedInUser._id.toString())
        {
            return res.status(400).json({message:"You are not authorized to review this connection request"});
        }
        connectionRequest.status=status;

        const data= await connectionRequest.save();

        res.json({message:"Connection request reviewed successfully", status, data, connectionRequest});
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}

module.exports={reviewConnectionRequest};// function is send into {} curly braces