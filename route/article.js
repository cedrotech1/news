const express = require('express');
const router = express.Router();
const {verifyauto}=require("../mindlewares/autho");
const article=require("../models/article");



const multer = require('multer');

const storage=multer.diskStorage({

  destination:(req,file,cb)=>{
    cb(null,'./upload/');

  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);

  }
})


const upload=multer({storage:storage})


const {getALL,One,Add,Update,Delete,getList,AddC,Like}=require("../controller/articleCont");


  router.post('/add', Add)
  router.get('/list', getList)
  router.get('/all',verifyauto, getALL)
  router.get('/one/:id', One);
  router.put('/update/:id', Update)
  router.delete("/delete/:id",Delete)
  router.post('/comment', AddC)
  router.post('/like', Like)



  router.post('/test', upload.single("ArticleImage"), Add)

  // router.get('/test', test)


// Export the router
module.exports = router;
