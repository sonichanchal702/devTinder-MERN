const ConnectionRequest = require("../model/ConnectionRequest.model");

const getPendingConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user; // ✅ full user object!

    const USER_SAFE_DATA = "firstName lastName photoUrl age gender bio"; // ✅

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id, // ✅ sirf received requests!
      status: "interested",       // ✅ sirf pending!
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => row.fromUserId);

    res.json({ 
      data: data, 
      message: "Pending connection requests fetched successfully" 
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getPendingConnectionRequest };