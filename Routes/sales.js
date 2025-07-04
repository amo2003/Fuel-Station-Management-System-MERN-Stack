const express = require("express");
const router = express.Router();
const SaleController = require("../Controllers/SaleController");

router.post("/", SaleController.recordSale);          // Add sale
router.get("/", SaleController.getAllSales);          // Get all sales
router.get("/:id", SaleController.getSaleById);       // Get sale by id
router.put("/:id", SaleController.updateSale);        // Update sale
router.delete("/:id", SaleController.deleteSale);    


module.exports = router;
