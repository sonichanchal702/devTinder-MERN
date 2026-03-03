const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ["ignored", "accepted", "rejected", "interested"],
      message: `{VALUE} is invalid status type!`
    }
  }
}, {
  timestamps: true
});

// when req send to ourselves -Err handling
connectionRequestSchema.pre("save", function(next)
{
  const connectionRequest=this;
  // u can also check this in the API level validations...
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("cannot send the connection request to yourself!");
  }
  next();
});


const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;