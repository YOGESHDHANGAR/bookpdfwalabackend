const Bookpdf = require("../models/bookpdfModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create All Book Pdf
exports.createBookpdf = catchAsyncErrors(async (req, res, next) => {
  const createbookpdf = await Bookpdf.create(req.body);

  res.status(201).json({
    success: true,
    createbookpdf,
  });
});

// Get All Book Pdf
exports.getAllBookpdf = catchAsyncErrors(async (req, res, next) => {
  const getallbookpdf = await Bookpdf.find();

  res.status(200).json({
    success: true,
    getallbookpdf,
  });
});

// Get Single Book Pdf
exports.getSingleBookpdf = catchAsyncErrors(async (req, res, next) => {
  const getsinglebookpdf = await Bookpdf.findById(req.params.bookpdf_id);

  res.status(200).json({
    success: true,
    getsinglebookpdf,
  });
});
