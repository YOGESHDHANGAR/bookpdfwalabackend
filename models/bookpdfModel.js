const mongoose = require("mongoose");

const bookpdfSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  url: {
    type: String,
    required: true,
    select: false,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bookpdf", bookpdfSchema);
