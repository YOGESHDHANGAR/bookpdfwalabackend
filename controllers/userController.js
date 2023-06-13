const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const nodemailer = require("nodemailer");

const sendNotificationEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    // Set up the email details
    const mailOptions = {
      from: "stevesteve45155@gmail.com",
      to: "stevesteve45155@gmail.com",
      subject: "new order",
      text: `A new user has registered:\n\nUPI ID: ${user.upiId}\nEmail: ${user.email}\nMobile Number: ${user.mobileNumber}\nBook PDF ID: ${user.bookpdf_id}`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Notification email sent successfully");
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
};

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { upiId, email, bookpdf_id, mobileNumber } = req.body;
  const newRegisteredUser = await User.create({
    upiId,
    mobileNumber: mobileNumber,
    email: email,
    bookpdf_id,
  });
  console.log("newRegisteredUser", newRegisteredUser);

  sendNotificationEmail(newRegisteredUser);
  res.status(200).json(newRegisteredUser);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
