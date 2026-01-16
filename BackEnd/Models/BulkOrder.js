const mongoose = require("mongoose");

const BulkOrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Factory", 
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  preferredDate: {
    type: Date,
  },
  notes: {
    type: String
  },
  status: {
  type: String,
  enum: ["pending", "confirmed", "paid", "completed", "cancelled"],
  default: "pending"
}

}, { timestamps: true });  

module.exports = mongoose.model("BulkOrder", BulkOrderSchema);
