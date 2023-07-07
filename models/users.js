const mongoose=require("mongoose");

const usersSchema= new mongoose.Schema({
    fname:String,
    lname:String,
    password:String,
    username:String,
   
})
module.exports=mongoose.model('users',usersSchema);