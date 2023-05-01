var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require("jsonwebtoken");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoryRouter = require('./routes/categories');

var app = express();

app.set("secretKey","db2023")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/products', verifyToken, productsRouter);
app.use('/categories', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function verifyToken(req,res,next){
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"),function(err,payload){
    if(err){
      res.json({message:err.message})
    }else{
      console.log("Payload",payload)
      req.body.userId = payload.userId
      next()
    }
  })
}

app.verifyToken = verifyToken

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message:err.message || "There is an error"})
});

module.exports = app;
