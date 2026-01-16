const mongoose = require("mongoose");
const EVPayment = require("../Models/EVPayment");

// Add payment
const addpayment = async (req, res) => {
  const { name, card, vType, amount, expdate, cvv } = req.body;
  try {
    await EVPayment.create({ name, card, vType, amount, expdate, cvv });
    res.json({ status: "ok", message: "Payment registered successfully" });
  } catch (err) {
    console.error("Error adding payment:", err);
    res.status(500).json({ status: "error", message: "Payment registration failed" });
  } 
};

//  Get all EV payments
const getAllEVPayments = async (req, res) => {
  try {
    const evpayments = await EVPayment.find({});
    res.json({ status: "ok", data: evpayments });
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

//  Get EV payment by ID
const getEVPaymentById = async (req, res) => {
  const evpaymentId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(evpaymentId)) {
    return res.status(400).json({ status: "error", message: "Invalid EV Payment ID" });
  }

  try {
    const evpayment = await EVPayment.findById(evpaymentId);
    if (!evpayment) {
      return res.status(404).json({ status: "error", message: "EV Payment not found" });
    }
    res.json({ status: "ok", data: evpayment });
  } catch (err) {
    console.error("Error fetching EV Payment by ID:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Delete EV payment by ID
const deleteEVPayment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: "error", message: "Invalid payment ID" });
  }

  try {
    const deleted = await EVPayment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Payment not found" });
    }
    res.json({ status: "ok", message: "Payment deleted successfully" });
  } catch (err) {
    console.error("Error deleting payment:", err);
    res.status(500).json({ status: "error", message: "Failed to delete payment" });
  }
};


module.exports = {
  addpayment,
  getAllEVPayments,
  getEVPaymentById,
  deleteEVPayment,
};
