const mongoose = require("mongoose");

const bulkpaymentSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "BulkOrder", 
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

  pricePerLiter: { 
    type: Number, 
    required: true 
  },

  totalAmount: { 
    type: Number, 
    required: true 
  },

  paymentMethod: { 
    type: String, 
    enum: ["card", "slip"], 
    required: true 
  },
  

  // Card payment fields
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvv: { type: String },

  // Slip payment fields
  customerName: { type: String },
  bankName: { type: String },
  depositDate: { type: Date },
  depositAmount: { type: Number },
  slipFile: { type: String } // store filename
}, { timestamps: true });

module.exports = mongoose.model("Bulkincome", bulkpaymentSchema);
