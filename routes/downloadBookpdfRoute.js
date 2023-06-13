const express = require("express");
const { downloadBookpdf } = require("../controllers/downloadBookpdfController");
const router = express.Router();

router.route("/downloadbookpdf").get(downloadBookpdf);

module.exports = router;
