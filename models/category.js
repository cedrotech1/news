const mongoose=require("mongoose");

const categorySchema= new mongoose.Schema({
    title:String,
  
})
module.exports=mongoose.model('category',categorySchema);