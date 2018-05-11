var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  news=[];
  res.json(news);
})

module.exports = router;
