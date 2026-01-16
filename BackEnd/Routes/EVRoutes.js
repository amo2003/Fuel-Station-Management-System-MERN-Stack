const express = require("express");
const router = express.Router();
const EVController = require("../Controllers/EVController");

router.post("/evregister", EVController.registerEV);
router.post("/evlog", EVController.loginEV);
router.get("/getEVs", EVController.getAllEVs);
router.get("/getEV/:id", EVController.getEVById);
router.put("/updateEV/:id", EVController.updateEV);
router.delete("/deleteEV/:id", EVController.deleteEV);
router.post('/reset-password', EVController.resetEVPassword);


module.exports = router;