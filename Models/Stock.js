const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
     date:{
        type:String, //datatype
        required:true, //validation
    },
     type:{
        type:String, //datatype
        required:true, //validation
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
