const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
 rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model(
    "Rating", 
    ratingSchema
);
