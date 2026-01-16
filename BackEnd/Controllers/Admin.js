// Controllers/Admin.js

const Admin = require('../Models/Admin');

// Login Admin
const loginAdmin = async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) return res.status(400).json({ message: "Email and password required." });

  try {
    const existingAdmin = await Admin.findOne({ gmail: { $regex: `^${gmail}$`, $options: 'i' } });
    if (!existingAdmin) return res.status(404).json({ message: "Admin not found" });
    if (existingAdmin.password !== password) return res.status(401).json({ message: "Invalid credentials" });

    return res.status(200).json({
      message: "Login successful",
      admin: { _id: existingAdmin._id, gmail: existingAdmin.gmail },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add/Register Admin
const addAdmins = async (req, res) => {
  const { gmail, password } = req.body;
  if (!gmail || !password) return res.status(400).json({ message: "Email and password required." });

  try {
    const existingAdmin = await Admin.findOne({ gmail: { $regex: `^${gmail}$`, $options: 'i' } });
    if (existingAdmin) return res.status(409).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ gmail, password });
    await newAdmin.save();
    return res.status(201).json({ message: "Admin registered", admin: newAdmin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add admin" });
  }
};

module.exports = { 
    loginAdmin, 
    addAdmins };
