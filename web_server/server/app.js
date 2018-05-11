var express=require('express');
var path=require('path');

var news = require('/routes/news');

var index=require('./routes/index');
var app=express();
app.set('views',path.join(__dirname,'views'));
app.set('viewsengine','jade');
//serverstaticfiles
app.use('/static',express.static(path.join(__dirname, "../client/build/static")));
app.use('/news', news);

app.use('/',index);
//catch404
app.use(function(req,res,next){
res.status(404);
});

// TODO: remove this after development is done.
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

module.exports=app;
