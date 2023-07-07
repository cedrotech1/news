const category=require("../models/category");
const b=require("bcrypt");
const jwt = require("jsonwebtoken");



//   ________________ALL articleS____________________________

const getALL=async (req, res) => {
    try {
         const data= await category.find({
          // 'roomid': { $exists: true },
        })
         
            res.send({data:data}) 
    } catch (error) {
        res.send(error)
    }  
  }


  //   ________________ONE article____________________________
  const One=async (req, res) => {
    try {
      const id = req.params.id;
      const data = await category.findById(id).select('title');

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
    try {

     
          const data = {title};
          const onecategory = new category(data);
                
          const response = await onecategory.save();
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
 
     const title=req.body.title;
    
     
     const data={title}
     
     // const oneskills = new skills(data);
     category.findByIdAndUpdate(id,data)
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
    const deletecategory = await category.findByIdAndDelete(id);

    if (!deletecategory) {
      return res.status(404).json({ error: 'category not found' });
    }

    res.send({ article: deletecategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  module.exports={
    getALL,
    One,
    Add,
    Update,
    Delete

  }