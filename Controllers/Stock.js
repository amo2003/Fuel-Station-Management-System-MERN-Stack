const Stock = require("../Models/Stock");
const FuelStorage = require("../Models/FuelStorage");


// ✅ Get All stoc
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

// ✅ Add New stock
const addStocks = async (req, res) => {
  const { date, type, quantity, supplier } = req.body;

  try {
    // 1. Save in StockModel
    const newStock = new Stock({
      date,
      type,
      quantity,
      supplier
    });
    await newStock.save();

    // 2. Update or create in FuelStorage
    const fuel = await FuelStorage.findOne({ type });

    if (fuel) {
      // Update quantity
      fuel.quantity += Number(quantity);
      await fuel.save();
    } else {
      // Create new fuel type if not existing
      const newFuel = new FuelStorage({
        type,
        quantity: Number(quantity)
      });
      await newFuel.save();
    }

    return res.status(201).json({ message: "Stock added and storage updated", stock: newStock });
  } catch (err) {
    console.error("Add stock error:", err);
    return res.status(500).json({ message: "Unable to add stock" });
  }
};

// controller
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



// ✅ Get stock by ID
const getById = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const stock = await Stock.findById(id);

    if (!stock) {
      return res.status(404).json({ message: "stock not found" });
    }

    return res.status(200).json({ stock });
  } catch (err) {
    console.error("Get by ID error:", err);
    return res.status(500).json({ message: "Error fetching stock" });
  }
};

// ✅ Update stock
/*const updateStock = async (req, res) => {
  const { id } = req.params;
  const { date, type, quantity, supplier} = req.body;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { date, type, quantity, supplier},
      { new: true, runValidators: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: "stock not found" });
    }

    return res.status(200).json({ stock: updatedStock });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Unable to update stock" });
  }
};*/
const updateStock = async (req, res) => {
  const { id } = req.params;
  const { date, type, quantity, supplier } = req.body;

  try {
    const existingStock = await Stock.findById(id);
    if (!existingStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const oldQuantity = existingStock.quantity;
    const oldType = existingStock.type;

    // Update the stock record
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { date, type, quantity, supplier },
      { new: true, runValidators: true }
    );

    // Update FuelStorage
    // First subtract old quantity
    const fuelStorage = await FuelStorage.findOne({ type: oldType });
    if (fuelStorage) {
      fuelStorage.quantity -= oldQuantity;

      // If fuel type changed, update new type too
      if (oldType !== type) {
        await fuelStorage.save();

        let newTypeStorage = await FuelStorage.findOne({ type });
        if (newTypeStorage) {
          newTypeStorage.quantity += quantity;
          await newTypeStorage.save();
        } else {
          const newFuelStorage = new FuelStorage({
            type,
            quantity
          });
          await newFuelStorage.save();
        }
      } else {
        fuelStorage.quantity += quantity;
        await fuelStorage.save();
      }
    }

    return res.status(200).json({ message: "Stock updated", stock: updatedStock });

  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Unable to update stock" });
  }
};


// ✅ Delete stock
/*const deleteStock = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const stock = await Stock.findByIdAndDelete(id);

    if (!stock) {
      return res.status(404).json({ message: "stock not found" });
    }

    return res.status(200).json({ message: "stock deleted", stock });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Unable to delete stock" });
  }
};*/

const deleteStock = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Subtract quantity from FuelStorage
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





// ✅ Exports
exports.getAllStocks = getAllStocks;
exports.addStocks = addStocks;
exports.getById = getById;
exports.updateStock = updateStock;
exports.deleteStock = deleteStock;
exports.getCurrentStockLevels = getCurrentStockLevels;
