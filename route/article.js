const express = require('express');
const router = express.Router();
// const student=require("../models/student");
const {verifyauto}=require("../mindlewares/autho");

const {getALL,One,Add,Update,Delete,getList,Operation,Login,test}=require("../controller/articleCont");


  router.post('/add', Add)
  router.get('/operation', Operation)
  router.get('/list', getList)
  router.get('/all',verifyauto, getALL)
  router.get('/one/:id', One);
  router.put('/update/:id', Update)
  router.delete("/delete/:id",Delete)
  // router.post('/login', Login)

  // router.get('/test', test)


// Export the router
module.exports = router;
