const ConnectionRequest = require("../model/ConnectionRequest.model");

const getPendingConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user; // ✅ full user object!

    const USER_SAFE_DATA = "firstName lastName photoUrl age gender about"; 

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      }).populate("fromUserId", "firstName lastName photoUrl age gender about");

      const data = connectionRequests.map((row) => ({
        ...row.fromUserId.toObject(),  // user data
        requestId: row._id,            // request ka _id
      }));


    res.json({ 
      data: data, 
      message: "Pending connection requests fetched successfully" 
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getPendingConnectionRequest };