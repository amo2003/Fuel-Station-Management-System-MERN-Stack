const mongoose = require("mongoose"); 
const EV = require("../Models/EVRegister");

//register EV
const registerEV = async (req, res) => {
  const { name, gmail, password, vtype, address, contact } = req.body;
  try {
    await EV.create({ name, gmail, password, vtype, address, contact });
    res.json({ status: "ok", message: "EV registered successfully" });
  } catch (err) {
    console.error("Error registering EV:", err);
    res.status(500).json({ status: "error", message: "Registration failed" });
  }
};

// Login EV
const loginEV = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const ev = await EV.findOne({ gmail });
    if (!ev) {
      return res.json({ status: "error", message: "EV not found" });
    }
    if (ev.password === password) {
      return res.json({ status: "ok", data: ev });
    } else {
      return res.json({ status: "error", message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Get all EV
const getAllEVs = async (req, res) => {
  try {
    const evs = await EV.find({});
    res.json({ status: "ok", data: evs });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get factory by ID
const getEVById = async (req, res) => {
  const evId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(evId)) {
    return res.status(400).json({ status: "error", message: "Invalid EV ID" });
  }

  try {
    const ev = await EV.findById(evId);
    if (!ev) {
      return res.status(404).json({ status: "error", message: "EV not found" });
    }
    res.json({ status: "ok", data: ev });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update factory
const updateEV = async (req, res) => {
  const evId = req.params.id;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(evId)) {
    return res.status(400).json({ status: "error", message: "Invalid EV ID" });
  }

  try {
    const updatedEV = await EV.findByIdAndUpdate(evId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEV) {
      return res.status(404).json({ status: "error", message: "EV not found" });
    }

    res.json({ status: "ok", data: updatedEV });
  } catch (err) {
    console.error("Error updating EV:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Delete factory
const deleteEV = async (req, res) => {
  const evId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(evId)) {
    return res.status(400).json({ status: "error", message: "Invalid EV ID" });
  }

  try {
    await EV.findByIdAndDelete(evId);
    res.json({ status: "ok", message: "EV deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Reset password
const resetEVPassword = async (req, res) => {
  const { gmail, password } = req.body;

  if (!password || password.trim().length < 4) {
    return res.status(400).json({ status: "error", message: "Invalid new password" });
  }

  try {
    const ev = await EV.findOne({ gmail });
    if (!ev) {
      return res.status(404).json({ status: "error", message: "EV not found" });
    }

    ev.password = password;
    await ev.save();

    res.json({ status: "ok", message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ status: "error", message: "Reset failed" });
  }
};

module.exports = {
  registerEV,
  loginEV,
  getAllEVs,
  getEVById,
  updateEV,
  deleteEV,
  resetEVPassword,
};
