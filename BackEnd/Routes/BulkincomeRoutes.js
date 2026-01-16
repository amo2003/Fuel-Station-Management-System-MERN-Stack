const express = require("express");
const router = express.Router();
const PaymentController = require("../Controllers/Bulkincome");
const multer = require("multer");

// Configure Multer for slip upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post("/", PaymentController.createPayment); // card payments
router.post("/slip", upload.single("slipFile"), PaymentController.createPayment); // slip payments

router.get("/", PaymentController.getAllPayments);
router.get("/:paymentId", PaymentController.getPaymentById);
router.delete("/:paymentId", PaymentController.deletePayment);

module.exports = router;
