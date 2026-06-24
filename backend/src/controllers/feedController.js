const ConnectionRequest = require("../model/ConnectionRequest.model");
const User = require("../model/User.model");

const getFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    }).select("fromUserId toUserId");

    const hideUsers = new Set();
    hideUsers.add(loggedInUser._id.toString());

    connectionRequests.forEach((req) => {
      hideUsers.add(req.fromUserId.toString());
      hideUsers.add(req.toUserId.toString());
    });

    // ← explicit _id added to select
    const feed = await User.find({
      _id: { $nin: Array.from(hideUsers) }
    })
    .select("_id firstName lastName age gender about photoUrl skills userType socialLinks")
    .skip(skip)
    .limit(limit);

    res.json({ message: "Feed fetched!", data: feed });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFeed };