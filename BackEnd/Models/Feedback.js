const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    name:{
        type:String, 
        required:true, 
    },
     gmail:{
        type:String, 
        required:true, 
     },
     section:{
        type:String,
        required:true,
     },
     contact:{
        type:String, 
        required:true,
     },
     message:{
        type:String,
        required:true,
     },
      date:{
         type:String,
         required:true,
      },


});

module.exports = mongoose.model(
    "FeedbackModel",
    FeedbackSchema
)