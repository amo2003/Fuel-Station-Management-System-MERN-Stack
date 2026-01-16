const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EVRegisterSchema = new Schema({
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
     vtype:{
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
    "EVModel",
    EVRegisterSchema
)
        