const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EVPaymentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  card: {
    type: String, 
    required: true
  },
  vType:{
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  expdate: {
    type: String,
    required: true
  },
  cvv: {
    type: Number,
    required: true
  },

});

module.exports = mongoose.model(
    "EVPayment", 
    EVPaymentSchema
);
