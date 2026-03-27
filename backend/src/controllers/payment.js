const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../model/User.model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "your_key_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "your_key_secret",
});

// Order create karo
const createOrder = async (req, res) => {
  try {
    const { membershipType } = req.body;

    // Membership plans
    const plans = {
      silver: { amount: 499, currency: "INR" },
      gold: { amount: 999, currency: "INR" },
    };

    const plan = plans[membershipType];
    if (!plan) {
      return res.status(400).json({ message: "Invalid membership type!" });
    }

    const options = {
      amount: plan.amount * 100, // paise mein
      currency: plan.currency,
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json({ message: "Order created!", order, key: process.env.RAZORPAY_KEY_ID });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Payment verify karo
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, membershipType } = req.body;

    // Signature verify karo
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "your_key_secret")
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature!" });
    }

    // User ko premium karo
    const user = req.user;
    user.isPremium = true;
    user.membershipType = membershipType;
    await user.save();

    res.json({ message: "Payment verified! Premium activated!", user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, verifyPayment };