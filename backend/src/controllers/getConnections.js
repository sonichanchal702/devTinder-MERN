const ConnectionRequest = require("../model/ConnectionRequest.model");

const getConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const USER_SAFE_DATA = "firstName lastName photoUrl age gender about";

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

    // Apne aap ko filter karo — sirf dusra user dikhao
    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ message: "Connections fetched!", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getConnections };