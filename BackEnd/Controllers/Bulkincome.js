const Payment = require("../Models/Bulkincome");
const BulkOrder = require("../Models/BulkOrder");
const path = require("path");

// For file upload
const multer = require("multer");

// Set storage engine for slip photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files"); // folder to store slip images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const {
      orderId,
      fuelType,
      quantity,
      pricePerLiter,
      totalAmount,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      customerName,
      bankName,
      depositDate,
      depositAmount
    } = req.body;

    let slipFile = req.file ? req.file.filename : null;

    if (!orderId || !fuelType || !quantity || !pricePerLiter || !totalAmount || !paymentMethod) {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    const paymentData = {
      orderId,
      fuelType,
      quantity,
      pricePerLiter,
      totalAmount,
      paymentMethod
    };

    if (paymentMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv)
        return res.status(400).json({ status: "error", message: "Card details required" });

      paymentData.cardNumber = cardNumber;
      paymentData.expiryDate = expiryDate;
      paymentData.cvv = cvv;

    } else if (paymentMethod === "slip") {
      if (!customerName || !bankName || !depositDate || !depositAmount || !slipFile)
        return res.status(400).json({ status: "error", message: "Slip details required" });

      paymentData.customerName = customerName;
      paymentData.bankName = bankName;
      paymentData.depositDate = depositDate;
      paymentData.depositAmount = depositAmount;
      paymentData.slipFile = slipFile;
    }

    const payment = new Payment(paymentData);
    await payment.save();

    // Update bulk order status to 'paid'
    await BulkOrder.findByIdAndUpdate(orderId, { status: "paid" });

    res.json({ status: "ok", message: "Payment successful", data: payment });

  } catch (err) {
    console.error("Payment creation error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("orderId");
    res.json({ status: "ok", data: payments });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId).populate("orderId");
    if (!payment) return res.status(404).json({ status: "error", message: "Payment not found" });
    res.json({ status: "ok", data: payment });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const deleted = await Payment.findByIdAndDelete(paymentId);
    if (!deleted) return res.status(404).json({ status: "error", message: "Payment not found" });
    res.json({ status: "ok", message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
  upload // export multer middleware
};
