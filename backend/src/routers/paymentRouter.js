const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middleware/auth.middleware");
const { createOrder, verifyPayment } = require("../controllers/payment");

paymentRouter.post("/payment/create", userAuth, createOrder);
paymentRouter.post("/payment/verify", userAuth, verifyPayment);

module.exports = paymentRouter;