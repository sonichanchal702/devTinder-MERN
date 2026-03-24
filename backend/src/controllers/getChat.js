const Chat = require("../model/Chat");

const getChat = async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate("messages.senderId", "firstName lastName");

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, targetUserId],
        messages: [],
      });
    }

    res.json({ messages: chat.messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getChat };