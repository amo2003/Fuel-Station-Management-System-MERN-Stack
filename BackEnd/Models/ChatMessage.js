const mongoose = require("mongoose");
const chatMessageSchema = new mongoose.Schema({

  sender: { 
    type: String, 
    enum: ["customer", "admin"], 
    required: true 
  }, 
  message: { 
    type: String, 
    required: true 
  },
    pin: { 
      type: String, 
      required: true 
    },
  seen: { 
    type: Boolean, 
    default: false 
  }, 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model(
  "ChatMessage", 
  chatMessageSchema
);
