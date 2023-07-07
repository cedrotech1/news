const mongoose=require("mongoose");
const articleShema= new mongoose.Schema({
    title:String,
    body:String,
    image: String,
    published: Boolean,
    addedat: Date,
  
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    comments:[
        {
            body:String,
            email:String,
            addedat: Date,
            articleId:String
        }
    ],
    likes:[ {
        body:String,
        email:String,
        addedat: Date,
        articleId:String
    }],

    
})
module.exports=mongoose.model('articles',articleShema);