const crypto = require("crypto");
const Payment = require("../models/paymentModel.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Razorpay = require("razorpay");

exports.checkout = catchAsyncErrors(async (req, res) => {
  var razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  console.log(
    "key_id: process.env.RAZORPAY_API_KEY",
    process.env.RAZORPAY_API_KEY
  );

  console.log(
    "key_secret: process.env.RAZORPAY_API_SECRET,",
    process.env.RAZORPAY_API_SECRET
  );

  console.log("razorpayInstance", razorpayInstance);

  const options = {
    amount: 500,
    currency: "INR",
  };

  console.log("options", options);

  const razorpayInstanceOrders = await razorpayInstance.orders.create(options);
  console.log("razorpayInstanceOrders", razorpayInstanceOrders);

  res.status(200).json({
    success: true,
    razorpayInstanceOrders,
  });
});

exports.paymentVerification = catchAsyncErrors(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const bookpdf_id = req.params.bookpdf_id;

    res.redirect(
      `${process.env.FRONTEND_REDIRECTING_BASE_URL}/paymentsuccess?razorpay_payment_id=${razorpay_payment_id}&bookpdf_id=${bookpdf_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
