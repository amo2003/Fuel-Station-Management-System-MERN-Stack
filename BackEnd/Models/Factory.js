const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactorySchema = new Schema({
     name:{
        type:String,
        required:true, 
    },
     gmail:{
        type:String, 
        required:true, 
     },
     password:{
         type:String,
         required: true,
     },
     company:{
        type:String,
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
    "Factory",
    FactorySchema
)