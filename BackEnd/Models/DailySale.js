const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailySaleSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  soldQuantity: {
    type: Number,
    required: true,
  },
  staff: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "DailySale", 
  DailySaleSchema
);
