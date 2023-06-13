const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Payment = require("../models/paymentModel");
const Product = require("../models/bookpdfModel");

exports.downloadBookpdf = catchAsyncErrors(async (req, res, next) => {
  const razorpaySuccessId = req.params.razorpaySuccessId;

  const foundId = await Payment.findOne(razorpaySuccessId);

  if (!foundId) {
    res.status(401).json({
      success: false,
    });
  }
  const bookpdf_id = req.query.bookpdf_id;

  const bookpdf_with_pdf_url = await Product.findById(bookpdf_id).select(
    "+url"
  );
  res.status(201).send(bookpdf_with_pdf_url);
});
