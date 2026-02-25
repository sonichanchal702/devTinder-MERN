const User = require("../model/User.model.js");
const ConnectionRequestModel = require("../model/ConnectionRequest.model.js");

const sendConnectionRequest = async (req, res) => {
  try {

    const fromUserId= req.userId;
    const toUserId= req.params.toUserId;
    const status=req.params.status;

    // create the new connection request using model schema of connection request and save it into database
    const connectionRequest=new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const allowedStatus=["ignored", "interested"];
    if(!allowedStatus.includes(status))
    {
      return res.status(400).json({message:"Invalid status type! Allowed status types are: ignored, interested"});
      
    }

    const toUser=await User.findById(toUserId);
    if(!toUser)
    {
      return res.status(404).json({message:"To user not found!"});
    }

    const existingRequest=await ConnectionRequestModel.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
    });// check the connection request already exists or not in database by using fromUserId and toUserId and if it is exists then return the
    //  response that connection request already exists otherwise save the connection request into database and return the response that connection request sent successfully and return the data of connection request 
    // which is saved into database and it is used to check the connection request already exists or not in database by using fromUserId and toUserId and if it is exists then return the response that connection request already exists
    //  otherwise save the connection request into database and return the response that connection request sent successfully and return the data of connection request which is saved into database and 
    // it is used to check the connection request already exists or not in database by using fromUserId and toUserId and if it is exists then return the response that connection request already exists otherwise
    if(existingRequest)
    {
      return res.status(400).json({message:"Connection request already exists!"});
    }

    const data=await connectionRequest.save();// save the connection request into database and return the data
    res.json({
      message:" Connection request sent successfully!",
      data,
    });

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={sendConnectionRequest};// function is send into {} curly braces




