const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppoinmentSchema = new Schema({
    date:{
        type:String, 
        required:true, 
    },
    slot: {
        type: String, 
        required: true,
    },
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
     
}); 

module.exports = mongoose.model(
    "AppoinmentModel",
    AppoinmentSchema
)
        