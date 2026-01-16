const mongoose = require("mongoose");
const chatPinSchema = new mongoose.Schema({

  pin: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model(
  "ChatPin", 
  chatPinSchema
);
