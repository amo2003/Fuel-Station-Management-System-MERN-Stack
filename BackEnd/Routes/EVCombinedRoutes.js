const express = require("express");
const router = express.Router();
const { createAppointmentWithPayment } = require("../Controllers/AppoinmentWithPaymentController");

router.post("/book", createAppointmentWithPayment);

module.exports = router;
 