const express = require("express");
const {
  getAllBookpdf,
  createBookpdf,
  getSingleBookpdf,
} = require("../controllers/bookpdfController");

const router = express.Router();

router.route("/getallbookpdf").get(getAllBookpdf);

router.route("/createbookpdf").post(createBookpdf);

router.route("/getsinglebookpdf/:bookpdf_id").get(getSingleBookpdf);

module.exports = router;
