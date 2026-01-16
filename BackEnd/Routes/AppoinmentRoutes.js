const express = require("express");
const router = express.Router();
const Appoinment = require("../Controllers/Appoinment");

router.post("/appoinment", Appoinment.createAppointment);
router.get("/getAppoinments", Appoinment.getAllAppointments);
router.get("/getone", Appoinment.getAppointmentsByDate);
router.get("/getbyid/:id", Appoinment.getAppointmentById);
router.put("/update/:id", Appoinment.updateAppointment);
router.delete("/delete/:id", Appoinment.deleteAppointment);
router.get("/getAppointmentsByEmail", Appoinment.getAppointmentsByEmail);


module.exports = router;
