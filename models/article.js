const mongoose=require("mongoose");
const articleShema= new mongoose.Schema({
    title:String,
    body:String,
    image: String,
    published: Boolean,
    addedat: Date,
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
    },
  
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    comments:[
        {
            content:String,
            email:String,
            addedat: Date,
            // articleId:String
        }
    ],
    likes:[ {
        email:String,
    }],

    
})
module.exports=mongoose.model('articles',articleShema);