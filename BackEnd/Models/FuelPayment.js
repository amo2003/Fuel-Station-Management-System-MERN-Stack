const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FuelPaymentSchema = new Schema({
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StockModel',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  } 
});

module.exports = mongoose.model(
  "FuelPayment", 
  FuelPaymentSchema
);
