const express = require("express");
const router = express.Router();
const factoryController = require("../Controllers/Factory");

router.post("/register", factoryController.registerFactory);
router.post("/falog", factoryController.loginFactory);
router.get("/getFactorys", factoryController.getAllFactories);
router.get("/getFactory/:id", factoryController.getFactoryById);
router.put("/updateFactory/:id", factoryController.updateFactory);
router.delete("/deleteFactory/:id", factoryController.deleteFactory);
router.post('/reset-password', factoryController.resetFactoryPassword);


module.exports = router;