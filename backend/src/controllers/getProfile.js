const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "Profile fetched!", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile };