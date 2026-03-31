// ✅ Poora fixed sendConnectionRequest.js:
const User = require("../model/User.model.js");
const ConnectionRequestModel = require("../model/ConnectionRequest.model.js");

const sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id; // ← fix
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // ✅ Pehle validation karo
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status!" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Connection request already exists!" });
    }

    // ✅ Baad mein create karo
    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({ message: "Connection request sent successfully!", data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendConnectionRequest };