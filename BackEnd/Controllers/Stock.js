const Stock = require("../Models/Stock");
const FuelStorage = require("../Models/FuelStorage");

//  Get All stock
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();

    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: "No stock found" });
    }

    return res.status(200).json({ stocks });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ message: "Error retrieving stock" });
  }
};

//  Add New stock
const addStocks = async (req, res) => {
  const { date, type, quantity, supplier } = req.body;

  try {
    const newStock = new Stock({ date, type, quantity, supplier });
    await newStock.save();

    const fuel = await FuelStorage.findOne({ type });

    if (fuel) {
      fuel.quantity += Number(quantity);
      await fuel.save();
    } else {
      const newFuel = new FuelStorage({ type, quantity: Number(quantity) });
      await newFuel.save();
    }

    return res.status(201).json({ message: "Stock added and storage updated", stock: newStock });
  } catch (err) {
    console.error("Add stock error:", err);
    return res.status(500).json({ message: "Unable to add stock" });
  }
};

// Get stock by ID
const getById = async (req, res) => {
  const { id } = req.params;
  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    return res.status(200).json({ stock });
  } catch (err) {
    console.error("Get by ID error:", err);
    return res.status(500).json({ message: "Error fetching stock" });
  }
};

//  Update stock with correct fuel level handling
const updateStock = async (req, res) => {
  const { id } = req.params;
  const { date, type, quantity, supplier } = req.body;

  try {
    const existingStock = await Stock.findById(id);
    if (!existingStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const oldQuantity = Number(existingStock.quantity);
    const newQuantity = Number(quantity);
    const oldType = existingStock.type;

    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { date, type, quantity: newQuantity, supplier },
      { new: true, runValidators: true }
    );

    const oldFuelStorage = await FuelStorage.findOne({ type: oldType });
    if (oldFuelStorage) {
      oldFuelStorage.quantity -= oldQuantity;
      if (oldFuelStorage.quantity < 0) oldFuelStorage.quantity = 0;
      await oldFuelStorage.save();
    }

    const newFuelStorage = await FuelStorage.findOne({ type });
    if (newFuelStorage) {
      newFuelStorage.quantity += newQuantity;
      await newFuelStorage.save();
    } else {
      const newFuel = new FuelStorage({ type, quantity: newQuantity });
      await newFuel.save();
    }

    return res.status(200).json({ message: "Stock updated", stock: updatedStock });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Unable to update stock" });
  }
};

//  Delete stock
const deleteStock = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const fuelStorage = await FuelStorage.findOne({ type: stock.type });
    if (fuelStorage) {
      fuelStorage.quantity -= stock.quantity;
      if (fuelStorage.quantity < 0) fuelStorage.quantity = 0;
      await fuelStorage.save();
    }

    await Stock.findByIdAndDelete(id);
    return res.status(200).json({ message: "Stock deleted", stock });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Unable to delete stock" });
  }
};

// Get Fuel Storage Levels
const getCurrentStockLevels = async (req, res) => {
  try {
    const storage = await FuelStorage.find();
    if (!storage || storage.length === 0) {
      return res.status(404).json({ message: "No fuel storage records found" });
    }

    return res.status(200).json({ storage });
  } catch (err) {
    console.error("Get fuel storage error:", err);
    return res.status(500).json({ message: "Error retrieving fuel levels" });
  }
};


exports.getAllStocks = getAllStocks;
exports.addStocks = addStocks;
exports.getById = getById;
exports.updateStock = updateStock;
exports.deleteStock = deleteStock;
exports.getCurrentStockLevels = getCurrentStockLevels;
