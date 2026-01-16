const mongoose = require("mongoose"); 
const Factory = require("../Models/Factory");

// Register factory
const registerFactory = async (req, res) => {
  const { name, gmail, password, company, address, contact } = req.body;
  try {
    await Factory.create({ name, gmail, password, company, address, contact });
    res.json({ status: "ok", message: "Factory registered successfully" });
  } catch (err) {
    console.error("Error registering factory:", err);
    res.status(500).json({ status: "error", message: "Registration failed" });
  }
};

// Login factory
const loginFactory = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const factory = await Factory.findOne({ gmail });
    if (!factory) {
      return res.json({ status: "error", message: "Factory not found" });
    }
    if (factory.password === password) {
      return res.json({ status: "ok", data: factory });
    } else {
      return res.json({ status: "error", message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Get all factories
const getAllFactories = async (req, res) => {
  try {
    const factories = await Factory.find({});
    res.json({ status: "ok", data: factories });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get factory by ID
const getFactoryById = async (req, res) => {
  const factoryId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(factoryId)) {
    return res.status(400).json({ status: "error", message: "Invalid factory ID" });
  }

  try {
    const factory = await Factory.findById(factoryId);
    if (!factory) {
      return res.status(404).json({ status: "error", message: "Factory not found" });
    }
    res.json({ status: "ok", data: factory });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update factory
const updateFactory = async (req, res) => {
  const factoryId = req.params.id;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(factoryId)) {
    return res.status(400).json({ status: "error", message: "Invalid factory ID" });
  }

  try {
    const updatedFactory = await Factory.findByIdAndUpdate(factoryId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedFactory) {
      return res.status(404).json({ status: "error", message: "Factory not found" });
    }

    res.json({ status: "ok", data: updatedFactory });
  } catch (err) {
    console.error("Error updating factory:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Delete factory
const deleteFactory = async (req, res) => {
  const factoryId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(factoryId)) {
    return res.status(400).json({ status: "error", message: "Invalid factory ID" });
  }

  try {
    await Factory.findByIdAndDelete(factoryId);
    res.json({ status: "ok", message: "Factory deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Reset password
const resetFactoryPassword = async (req, res) => {
  const { gmail, password } = req.body;

  if (!password || password.trim().length < 4) {
    return res.status(400).json({ status: "error", message: "Invalid new password" });
  }

  try {
    const factory = await Factory.findOne({ gmail });
    if (!factory) {
      return res.status(404).json({ status: "error", message: "Factory not found" });
    }

    factory.password = password;
    await factory.save();

    res.json({ status: "ok", message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ status: "error", message: "Reset failed" });
  }
};

module.exports = {
  registerFactory,
  loginFactory,
  getAllFactories,
  getFactoryById,
  updateFactory,
  deleteFactory,
  resetFactoryPassword,
};
