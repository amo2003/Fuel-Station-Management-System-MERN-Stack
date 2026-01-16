const Payment = require("../Models/FuelPayment");

// Create Payment
const createPayment = async (req, res) => {
  const { stockId, date, type, quantity, supplier, amount } = req.body;

  try {
    const newPayment = new Payment({
      stockId,
      date,
      type,
      quantity,
      supplier,
      amount
    });

    await newPayment.save();
    return res.status(201).json({ message: "Payment recorded", payment: newPayment });
  } catch (err) {
    console.error("Payment save error:", err);
    return res.status(500).json({ message: "Failed to save payment" });
  }
};

// Get All Payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    return res.status(200).json({ payments });
  } catch (err) {
    console.error("Get payments error:", err);
    return res.status(500).json({ message: "Failed to get payments" });
  }
};

// Get Payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ payment });
  } catch (err) {
    console.error("Get by ID error:", err);
    return res.status(500).json({ message: "Error fetching payment" });
  }
};

// Update Payment
const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({ message: "Payment updated", payment: updated });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Failed to update payment" });
  }
};
 
// Delete Payment
const deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Payment deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Delete failed" });
  }
};

// Get Payment by Stock ID
const getPaymentByStockId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ stockId: req.params.stockId });
    if (!payment) return res.status(404).json({ message: "No payment found" });
    return res.status(200).json({ payment });
  } catch (err) {
    console.error("Get by Stock ID error:", err);
    return res.status(500).json({ message: "Error fetching payment by stock ID" });
  }
};

exports.getPaymentByStockId = getPaymentByStockId;


  exports.createPayment = createPayment;
  exports.getAllPayments = getAllPayments;
  exports.getPaymentById = getPaymentById;
  exports.updatePayment = updatePayment;
  exports.deletePayment = deletePayment;
