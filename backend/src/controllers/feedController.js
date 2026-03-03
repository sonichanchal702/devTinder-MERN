const User= require("../model/User.model");
const connectionRequestModel=require("../model/ConnectionRequest.model");
const getFeed=async(req,res)=>{
    try{
         const loggedInUserId=req.userId;
         let { page, limit}=req.query;
         page=parseInt(page) ||1;
         limit=parseInt(limit) ||10;
         const skip=(page-1)*limit;
         // get the connection request of the logged in user where status is accepted or interested and get the toUserId from that connection request and then get the user details of that toUserId and then send the response to the user

         const connectionRequests=await connectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUserId._id},
                {toUserId:loggedInUserId._id}
            ]
    }).select("fromUserId toUserId");

    const hideUsers=new Set();
    hideUsers.add((loggedInUserId._id).toString());
    const feed=await User.find({
        _id: { $nin:Array.from(hideUsers)}
    })
    .select("Name, Gender")
    .skip(skip)
    .limit(limit);

    res.json({message:"Feed fetched successfully", data:feed});
    }catch(err){
        res.status(500).json({message:"Internal server error", error:err.message});
    }
};

module.exports={getFeed};