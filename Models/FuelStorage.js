// models/FuelStorage.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FuelStorageSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true // Ensure only one entry per fuel type
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model(
  "FuelStorage", 
  FuelStorageSchema
);
