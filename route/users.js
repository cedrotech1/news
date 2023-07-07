const express = require('express');
const router = express.Router();
// const student=require("../models/hos");

const {getALL,One,Add,Update,Delete,Login}=require("../controller/usersCont");


  router.post('/add', Add)
  router.get('/all', getALL)
  router.get('/one/:id', One);
  router.put('/update/:id', Update)
  router.delete("/delete/:id",Delete)

  router.post('/login', Login)


// Export the router
module.exports = router;