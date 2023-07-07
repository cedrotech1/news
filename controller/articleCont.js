const article=require("../models/article");
const b=require("bcrypt");
const jwt = require("jsonwebtoken");
const {verifyauto}=require("../mindlewares/autho");


//   ________________ALL articleS____________________________

const getALL=async (req, res) => {
    try {
         const data= await article.find({
          // 'roomid': { $exists: true },
        }).populate({
          path: 'userid',
          select: 'fname lname',
          // populate: {
          //   path: 'hostelid',
          //   select: 'name location',
          // }, // Specify the fields you want to include
        });
         
            res.send({data:data}) 
    } catch (error) {
        res.send(error)
    }  
  }

  const Operation=async (req, res) => {
    try {
         let  data= await article.find().populate("roomid");
       
        data= data.filter(data=> data.roomid.roomnumber>100)
         
            res.send({data:data}) 



    } catch (error) {
        res.send(error)
    }  
  }



  const Login = async (req, res) => {
    try {
      const usernamex = req.body.usernamex;
      const passwordx = req.body.passwordx;
  
      const articleData = await article.findOne({ username: usernamex }).select('password username fname lname');

          if (!articleData) {
            res.send({message:'invalid username!'});
            return;
          }

          const storedPassword = articleData.password;
    
      // // Compare the provided password with the stored hashed password
              const passwordMatch = await b.compare(passwordx, storedPassword);
              if (passwordMatch) 
              {
                const secret="am cedrick";
                // req.session.article=usernamex;
                // console.log(req.session.article);
                 const token=jwt.sign({data:articleData},secret);
                res.send({message:'Login successful!',token});
              } else {
                res.send({message:'Invalid  password'});
              }

    } catch (error) {
      res.send(error);
    }
  };
  




  const getList=async (req, res) => {
    try {
         const data= await article.find({}, { fname: 1,lname: 1,age: 1,gender:1,password:1,username: 1 });
                 
            res.send({data:data}) 
    } catch (error) {
        res.send(error)
    }  
  }


  const test=async (req, res) => {

    const secret="am cedrick"
    const token=req.headers['autorization'];

    const verify=jwt.verify(token,secret,(err,decode)=>{
      if(err)
      {
        res.send(err.message)
      }else{
        console.log(decode)
        if(decode.data)
        {
          console.log("yes")
          // next();
        }
       
      }
    }) 

    // try {
    //      const data= await article.find({}, { fname: 1,lname: 1,age: 1,gender:1,password:1,username: 1 });
                 
    //         // res.send({data:verifyauto.}) 
    // } catch (error) {
    //     res.send(error)
    // }  
  }




  //   ________________ONE article____________________________
  const One=async (req, res) => {
    try {
      const id = req.params.id;
      const data = await article.findById(id).select('fname lname').populate('roomid');

      if (!data) {
        // Data does not exist for the provided id
        return res.send('Data not found');
      }
      // Process the retrieved data
      res.send(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    }
  }
  //   ________________ADD____________________________
  const Add = async (req, res) => {
   

    const title = req.body.title;
    const body = req.body.body;
    const image = req.body.image;
    const published = req.body.published;
    const userid = req.body.userid;
   
  
    try {

     
          const data = {title, body, image, published,userid};
          const onearticle = new article(data);
                
          const response = await onearticle.save();
          res.send(response);
        }
    
 
     catch (err) {
      res.send({ error: err });
    }
  };
  
  
//   __________________UPDATE________________________________________

const Update=(req, res) => {
    try {
 
     const id=req.params.id;
 
     const fname=req.body.fname;
     const lname=req.body.lname;
     const gender=req.body.gender;
     const age=req.body.age;
     const username=req.body.username;
     const roomid=req.body.roomid;
     
     const data={fname,lname,roomid,age,gender,username}
     
     // const oneskills = new skills(data);
     article.findByIdAndUpdate(id,data)
             .then(() => {
                 // Process the retrieved data
                 res.send(data)
                 })
                 .catch((error) => {
                 console.error('Error retrieving data:', error);
                 }); 
     
    } catch (error) {
     console.log(error)
    } 
  }

//   ________________DELETE____________________________

const Delete = async (req, res) => {
  try {

    const id = req.params.id;
    const deletedarticle = await article.findByIdAndDelete(id);

    if (!deletedarticle) {
      return res.status(404).json({ error: 'article not found' });
    }

    res.send({ article: deletedarticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  module.exports={
    getALL,
    One,
    Add,
    Update,
    Delete,
    getList,
    Operation,
    Login,
    test
  }