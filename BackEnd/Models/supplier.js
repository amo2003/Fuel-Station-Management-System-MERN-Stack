const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    name:{
        type:String, 
        required:true, 
    },
    gmail:{
        type:String, 
        required:true, 
     },
     age:{
        type:Number,
        required:true,
     },
     address:{
        type:String, 
        required:true,
     },
     contact:{
        type:String,
        required:true,
     },

});

module.exports = mongoose.model(
    "SupplierModel",
    SupplierSchema
)