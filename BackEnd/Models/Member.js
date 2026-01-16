const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
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
     role:{
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
    "MemberModel",
    MemberSchema
)
