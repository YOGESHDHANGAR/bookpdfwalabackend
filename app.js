const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const bookpdf = require("./routes/bookpdfRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
const donwloadbookpdf = require("./routes/downloadBookpdfRoute");

app.use("/api/v1", bookpdf);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", donwloadbookpdf);

app.get("/api/v1/getkey", (req, res, next) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
