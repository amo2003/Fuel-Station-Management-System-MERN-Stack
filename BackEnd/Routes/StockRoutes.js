const express = require("express");
const router = express.Router();
const Stock = require("../Controllers/Stock");

router.get("/", Stock.getAllStocks);
router.get("/fuelLevels", Stock.getCurrentStockLevels );
router.post("/", Stock.addStocks);
router.get("/:id", Stock.getById);
router.put("/:id", Stock.updateStock);
router.delete("/:id", Stock.deleteStock);



module.exports = router;
