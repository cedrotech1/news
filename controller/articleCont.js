const article=require("../models/article");
const b=require("bcrypt");
const jwt = require("jsonwebtoken");
const {verifyauto}=require("../mindlewares/autho");


//   ________________ALL articleS____________________________

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

const getALL=async (req, res) => {
    try {
         const data= await article.find({
          // 'roomid': { $exists: true },
        }).populate({
          path: 'userid',
          select: 'fname lname',
        }).populate({
          path: 'categoryid',
          select: 'title',
        });
         
            res.send({data:data}) 
    } catch (error) {
        res.send(error)
    }  
  }




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
    const categoryid = req.body.categoryid;
    const ArticleImage = req.file.path;
   
  
    try {

     
          const data = {title, body, image, published,userid,ArticleImage};
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
     const categoryid = req.body.categoryid;
     
     const data={fname,lname,roomid,age,gender,username,categoryid}
     
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

const  AddC= async(req, res) => {
  let email = req.body.email;
  let content = req.body.content;
  let article_id = req.body.article_id;
  let addedat=today
  // console.log(content);
 
  try {
        
         const dataX={email,content,addedat};
        //  console.log(dataX);

        // const oneuser = new users.comment(data);
        const data = await article.findById(article_id);
        data.comments.push(dataX)
        await data.save();

        if (!data) {
          return res.status(404).json({ error: 'article not found' });
        }
    
              
        // const response = await oneuser.save();
        res.send(data);
      }
   catch (err) {
    res.send({ error: err.message });
  }
};

const  Like= async(req, res) => {
  let email = req.body.email;
  // let content = req.body.content;
  let article_id = req.body.article_id;
  let addedat=today
  // console.log(content);
 
  try {
        
         const dataX={email};

        const data = await article.findById(article_id);
   

        if (!data) {
          return res.status(404).json({ error: 'article not found' });
        }
        else{

          const dataLikes=data.likes;
       
          
          const filteredArray = dataLikes.filter(obj => obj.email === email);

          if(filteredArray.length==0){
            // res.send("comment now");
                 data.likes.push(dataX)
                await data.save();
                res.send(data.likes);
          }else{
            res.send("sorry you can not like article twice");
          }

        }

        
      }
   catch (err) {
    res.send({ error: err.message });
  }
};

  module.exports={
    getALL,
    One,
    Add,
    Update,
    Delete,
    getList,
    AddC,
    Like
  }