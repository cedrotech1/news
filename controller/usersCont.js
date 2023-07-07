// const student=require("../models/users");users
const b=require("bcrypt");
const jwt = require("jsonwebtoken");
const users=require("../models/users");

//   ________________ALL USERS____________________________

const getALL=async (req, res) => 
    {
      try {
          const data= await users.find();
          res.send({data:data}) 
          } 

          catch (error) {
          res.send(error)
          }  
    }



  //   ________________ONE USERS____________________________
  const One=async (req, res) => {
    try {
      const id = req.params.id;
      const data = await users.findById(id).select('fname lname username');

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
    const Add=(req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    let password=req.body.password;

 
    
    
    try {

      b.hash(password,10,async (err,hash)=>{

        if(err)
        {
          console.log(err)
        }else{
          password=hash;
           const data={fname,lname,username,password};
          const oneuser = new users(data);
                
          const response = await oneuser.save();
          res.send(response);
        }
    
 })


      
    } catch (err) {
      res.send({ error: err.message });
    }
  };

//   __________________UPDATE________________________________________

const Update=(req, res) => {
    try {
 
     const id=req.params.id;
 
     const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
     const data={fname,lname,username}
     
     
     // const oneskills = new skills(data);
     users.findByIdAndUpdate(id,data)
             .then(() => {
                 // Process the retrieved data
                 res.send({message:"well updated",data:data})
                 })
                 .catch((error) => {
                 console.error('Error retrieving data:', error);
                 }); 
     
    } catch (error) {
     console.log(error)
    } 
  }

//   ________________DELETE____________________________

const Delete =(req,res)=>{
    try {
        const id=req.params.id
        users.findByIdAndDelete(id)
        .then(()=>{
            res.status(200).json("well deleted")
        })
        
    } catch (error) {
        res.status(500).json({error:error})
    }
 }

 const Login = async (req, res) => {
  try {
    const usernamex = req.body.usernamex;
    const passwordx = req.body.passwordx;

    const usersData = await users.findOne({ username: usernamex }).select('password username fname lname');

        if (!usersData) {
          res.send({message:'invalid username!'});
          return;
        }
        // res.send(usersData);

        const storedPassword = usersData.password;
        // res.send(storedPassword);

  
    // // Compare the provided password with the stored hashed password
            const passwordMatch = await b.compare(passwordx, storedPassword);
            if (passwordMatch) 
            {
                // res.send("storedPassword");
              const secret="am cedrick";
              // req.session.article=usernamex;
              // console.log(req.session.article);
               const token=jwt.sign({data:usersData},secret);
              res.send({message:'Login successful!',token});
            } else {
              res.send({message:'Invalid  password'});
            }

  } catch (error) {
    res.send(error.message);
  }
};





  module.exports={
    getALL,
    One,
    Add,
    Update,
    Delete,
    Login
  }