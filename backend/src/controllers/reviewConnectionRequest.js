const ConnectionRequestModel = require("../model/ConnectionRequest.model.js");

const reviewConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user; 

    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id, 
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({ message: "Connection request " + status + " successfully!", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { reviewConnectionRequest };