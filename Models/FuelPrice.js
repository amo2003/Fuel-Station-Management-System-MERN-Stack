const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FuelPriceSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true // Each fuel type should be unique
  },
  pricePerLiter: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model(
    'FuelPrice', 
    FuelPriceSchema
);
