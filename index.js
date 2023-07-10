const express=require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");

// const skills=require("./models/skills");
const app=express();
const bodyParser = require('body-parser');
const cookieParser =require("cookie-parser");
const mongoose = require('mongoose');
// const { Schema } = mongoose;
app.use(express.json());
app.use(cookieParser());
app.use("/upload",express.static("upload"));

const uri = 'mongodb://127.0.0.1:27017/article';

// const uri ="mongodb+srv://cedrick:cedrick@cluster0.wtzj3ht.mongodb.net/?retryWrites=true&w=majority";
// const uri = 'mongodb+srv://cedrick:cedrick@cluster0.wtzj3ht.mongodb.net/?retryWrites=true&w=majority';
// const mongoose = require('mongoose');
// const connectionString = 'your-mongodb-connection-string'; // Replace with your actual connection string

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform other operations here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


  app.use(session({
    key:"userID",
    secret:"mysecrete",
    resave:false,
    saveUninitialized:false,
    cookie:{
      expires:60*60*24,
    }
  }))

const categoryRoute = require('./route/category');
const articleRoute = require('./route/article');
const usersRoute = require('./route/users');


app.use('/article', articleRoute);
app.use('/users', usersRoute);
app.use('/category', categoryRoute);




// const uri = 'mongodb://127.0.0.1:27017/protofolio';
// cedrick:<password>@cluster0.wtzj3ht.mongodb.net/?retryWrites=true&w=majority
const x={
  wellcame:"welcame mr"
}

  app.get('/', (req, res) => {

    const secret="am cedrick"

    // const token=jwt.sign({name:"cedrick"},secret);
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2VkcmljayIsImlhdCI6MTY4ODY0NTM4MH0.Ts_46b0jmU0fnAwunnoLLeeTVFj8Xt5iRIvfOIuX1Ck";

    const decode=jwt.decode(token);
    const verify=jwt.verify(token,secret,(err,ok)=>{
      if(err)
      {
        console.log(err.message)
      }else{
         res.json({token,decode:decode,verify:verify});
      }
    })       

    res.json({token,decode:decode,verify:verify});
  });
  



app.listen(3000, ()=>{
    console.log("app server is runing on port 3000")
})


