const User = require("../model/User.model");
const sendConnectionRequest = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(`${user.name} Connection request sent!`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={sendConnectionRequest};// function is send into {} curly braces




