const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyFuelPriceSchema = new Schema({
  date: { 
    type: String, 
    required: true 
  },
  type: {  
    type: String, 
    required: true 
  },
  pricePerLiter: { 
    type: Number, 
    required: true 
  },
});

DailyFuelPriceSchema.index({ date: 1, type: 1 }, { unique: true });

module.exports = mongoose.model(
  "DailyFuelPrice", 
  DailyFuelPriceSchema
);
