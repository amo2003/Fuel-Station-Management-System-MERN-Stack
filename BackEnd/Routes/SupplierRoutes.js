const express = require("express");
const router = express.Router();
const Supplier = require("../Controllers/Supplier");

router.get("/", Supplier.getAllSuppliers);
router.post("/", Supplier.addSuppliers);
router.get("/:id", Supplier.getById);
router.put("/:id", Supplier.updateSupplier);
router.delete("/:id", Supplier.deleteSupplier);



module.exports = router;