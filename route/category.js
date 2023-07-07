const express = require('express');
const router = express.Router();
// const student=require("../models/student");
const {verifyauto}=require("../mindlewares/autho");

const {getALL,One,Add,Update,Delete}=require("../controller/categoryCont");


  router.post('/add', Add)
  router.get('/all',verifyauto, getALL)
  router.get('/one/:id', One);
  router.put('/update/:id', Update)
  router.delete("/delete/:id",Delete)

// Export the router
module.exports = router;
