const express = require("express");
const router = express.Router();
const EVController = require("../Controllers/EVPayment");

router.post("/", EVController.addpayment);
router.get("/evpayment", EVController.getAllEVPayments);
router.get("/evpayment/:id", EVController.getEVPaymentById);
router.delete("/delete/:id", EVController.deleteEVPayment);


module.exports = router;


 