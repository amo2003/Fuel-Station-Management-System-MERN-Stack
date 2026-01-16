const AppoinmentModel = require("../Models/Appoinment");
const EVPayment = require("../Models/EVPayment");

// Combined Appointment + Payment
const createAppointmentWithPayment = async (req, res) => {
  const { date, slot, name, gmail, password, vtype, card, expdate, cvv } = req.body;

  try { 
    const existing = await AppoinmentModel.findOne({ date, slot });
    if (existing) {
      return res.status(409).json({ message: "This slot is already booked" });
    }

    const amountMap = { Car: 1000, Bike: 500, Other: 700 };
    const amount = amountMap[vtype] || 0;

    const payment = await EVPayment.create({ name, card, vType: vtype, amount, expdate, cvv });

    const newBooking = await AppoinmentModel.create({ date, slot, name, gmail, password, vtype });

    res.status(201).json({ status: "ok", message: "Appointment and Payment successful", booking: newBooking });
  } catch (err) {
    console.error("Error in combined booking:", err);
    res.status(500).json({ status: "error", message: "Failed to book appointment with payment" });
  }
};

module.exports = {
  createAppointmentWithPayment,
};
