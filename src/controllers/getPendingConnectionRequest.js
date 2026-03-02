
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../model/User.model");

const getPendingConnectionRequest = async(req, res) => {
    try {
        const loggedInUser = req.userId;// Assuming user is attached to the request object by authentication middleware
        const user = await User.findById(loggedInUser);
        const USER_SAFE_DATA = "name gender"; // fields to be populated from the User model
        const connectionRequests = await ConnectionRequest.find({
             $or:[
               {toUserId: loggedInUser._id, status: "accepted"}, 
               {fromUserId: loggedInUser._id, status: "accepted"},
             ],
             }).populate("fromUserId",USER_SAFE_DATA)// populate the fromUserId field with the name, email, and profilePicture fields of the User model

             const data=connectionRequests.map((row)=> row.fromUserId);

            res.json({data: data, message: "Pending connection requests fetched successfully"});
    }catch (err) {
        res.status(400).send("Error fetching user profile: " + err.message);
    }
};
module.exports = { getPendingConnectionRequest };// function is send into {} curly braces