const express = require("express");
const router = express.Router();
const Payment  = require("../Controllers/FuelPaymentController");

router.get("/", Payment.getAllPayments);
router.post("/", Payment.createPayment);
router.get("/:id", Payment.getPaymentById);
router.put("/:id", Payment.updatePayment);
router.delete("/:id", Payment.deletePayment);

router.get("/stock/:stockId", Payment.getPaymentByStockId);


module.exports = router;
