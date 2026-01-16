const express = require("express");
const router = express.Router();
const Admin = require("../Controllers/Admin");

router.post("/login", Admin.loginAdmin);
router.post("/register", Admin.addAdmins);

module.exports = router;
