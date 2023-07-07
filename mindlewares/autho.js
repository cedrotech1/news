const jwt = require("jsonwebtoken");


const verifyauto=(req,res,next)=>{
    const secret="am cedrick"
    const token=req.headers['autorization'];
    // const token=jwt.sign({name:"cedrick"},secret);
    const verify=jwt.verify(token,secret,(err,decode)=>{
      if(err)
      {
        res.send(err.message)
      }else{
        //console.log(decode)
        if(decode.data)
        {
        //   console.log("yes")
          next();
        }
       
      }
    })       
  }

  module.exports={
    verifyauto
  }