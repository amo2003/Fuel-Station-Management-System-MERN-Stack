const FuelStorage = require("../Models/FuelStorage");
const DailySale = require("../Models/DailySale");

// Record a new sale and update fuel stock accordingly
const recordSale = async (req, res) => {
  const { date, type, soldQuantity, staff } = req.body;

  try {
    const sale = new DailySale({ date, type, soldQuantity, staff });
    await sale.save();

    const fuel = await FuelStorage.findOne({ type });
    if (!fuel) {
      return res.status(404).json({ message: "Fuel type not found" });
    }

    fuel.quantity = Math.max(fuel.quantity - Number(soldQuantity), 0); 
    await fuel.save();

    return res.status(200).json({ message: "Sale recorded", sale });
  } catch (err) {
    console.error("Error recording sale:", err);
    return res.status(500).json({ message: "Failed to record sale" });
  }
};

// Get all sales sorted by latest first
const getAllSales = async (req, res) => {
  try {
    const sales = await DailySale.find().sort({ date: -1 });
    if (!sales || sales.length === 0) {
      return res.status(404).json({ message: "No sales found" });
    }
    return res.status(200).json({ sales });
  } catch (err) {
    console.error("Error fetching sales:", err);
    return res.status(500).json({ message: "Failed to get sales" });
  }
};

// Get sale by ID (for edit/update form)
const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await DailySale.findById(id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    return res.status(200).json({ sale });
  } catch (err) {
    console.error("Error fetching sale by ID:", err);
    return res.status(500).json({ message: "Failed to get sale" });
  }
};

// Update a sale and adjust fuel storage accordingly
const updateSale = async (req, res) => {
  const { id } = req.params;
  const { date, type, soldQuantity, staff } = req.body;

  try {
    const oldSale = await DailySale.findById(id);
    if (!oldSale) {
      return res.status(404).json({ message: "Sale record not found" });
    }

    const oldFuel = await FuelStorage.findOne({ type: oldSale.type });
    if (oldFuel) {
      oldFuel.quantity += Number(oldSale.soldQuantity);
      await oldFuel.save();
    }

    // Update sale record
    const updatedSale = await DailySale.findByIdAndUpdate(
      id,
      { date, type, soldQuantity, staff },
      { new: true, runValidators: true }
    );

    const newFuel = await FuelStorage.findOne({ type });
    if (newFuel) {
      newFuel.quantity = Math.max(newFuel.quantity - Number(soldQuantity), 0);
      await newFuel.save();
    }

    return res.status(200).json({ message: "Sale updated", sale: updatedSale });
  } catch (err) {
    console.error(" Error updating sale:", err);
    return res.status(500).json({ message: "Failed to update sale" });
  }
};

// Delete a sale and revert fuel quantity
const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await DailySale.findById(id);
    if (!sale) {
      return res.status(404).json({ message: "Sale record not found" });
    }

    const fuel = await FuelStorage.findOne({ type: sale.type });
    if (fuel) {
      fuel.quantity += Number(sale.soldQuantity);
      await fuel.save();
    }

    await DailySale.findByIdAndDelete(id);
    return res.status(200).json({ message: "Sale deleted successfully" });
  } catch (err) {
    console.error("Error deleting sale:", err);
    return res.status(500).json({ message: "Failed to delete sale" });
  }
};

module.exports = {
  recordSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

