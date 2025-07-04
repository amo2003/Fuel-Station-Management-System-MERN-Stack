const FuelPrice = require('../Models/FuelPrice');

exports.getAllFuelPrices = async (req, res) => {
  try {
    const prices = await FuelPrice.find();
    res.json({ success: true, prices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addOrUpdateFuelPrice = async (req, res) => {
  const { type, pricePerLiter } = req.body;

  try {
    let existing = await FuelPrice.findOne({ type });
    if (existing) {
      existing.pricePerLiter = pricePerLiter;
      await existing.save();
      res.json({ success: true, message: "Fuel price updated", price: existing });
    } else {
      const newPrice = new FuelPrice({ type, pricePerLiter });
      await newPrice.save();
      res.json({ success: true, message: "Fuel price added", price: newPrice });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
