const User = require("../model/User.model");

// Order create karo — Mock
const createOrder = async (req, res) => {
  try {
    const { membershipType } = req.body;
    const user = req.user;

    const plans = {
      silver: { amount: 49900, currency: "INR" },
      gold: { amount: 99900, currency: "INR" },
    };

    const plan = plans[membershipType];
    if (!plan) {
      return res.status(400).json({ message: "Invalid membership type!" });
    }

    res.json({
      amount: plan.amount,
      currency: plan.currency,
      keyId: "mock_key",
      orderId: "order_" + Date.now(),
      notes: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Payment verify karo — Mock
const verifyPayment = async (req, res) => {
  try {
    const { membershipType } = req.body;
    const user = req.user;

    user.isPremium = true;
    user.membershipType = membershipType;
    await user.save();

    res.json({ 
      message: "Premium activated successfully!", 
      isPremium: true,
      membershipType 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, verifyPayment };