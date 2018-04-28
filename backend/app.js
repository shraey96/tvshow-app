"use strict"

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const cors = require('cors');
const rp = require('request-promise');
const morganBody  = require('morgan-body');
const moment = require('moment');
const momentTimezone = require('moment-timezone');

const users = require('./routes/users');
const feedbacks = require('./routes/feedbacks');
const forgotPassword = require('./routes/forgotPassword')

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

let db = mongoose.connection;

//check for db errors
db.once('open', function(){
	console.log('Connected to MongoDB');
});
db.on('error', function(err){
	console.log(err);
});

//init app
const app = express();


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
      next();
  }
});


// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
morganBody(app);


//express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));


// passport config
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
	res.locals.user = req.user || null;
	next();
});

app.get('/api/v1', function(req, res){
res.send({msg: "Welcome to tvshowapp API"})
});


// route files
app.use('/users', users);
app.use('/feedbacks', feedbacks);
app.use('/forgotPassword', forgotPassword);

// start server
app.listen(3005, function(){
    console.log('Server started on PORT 3005');
});
