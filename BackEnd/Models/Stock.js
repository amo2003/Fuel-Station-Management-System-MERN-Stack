const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
     date:{
        type:String, 
        required:true, 
    },
     type:{
        type:String, 
        required:true, 
     },
     quantity:{
         type:Number,
         required: true,
     },
     supplier:{
        type:String,
        required:true,
     },
    
});

module.exports = mongoose.model(
    "StockModel",
    StockSchema
)
