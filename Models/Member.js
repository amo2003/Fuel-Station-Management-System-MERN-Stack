const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
     name:{
        type:String, //datatype
        required:true, //validation
    },
     gmail:{
        type:String, //datatype
        required:true, //validation
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
        type:Number, //datatype
        required:true, //validation
     },
     address:{
        type:String, //datatype
        required:true, //validatio
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
