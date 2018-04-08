"use strict"

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const config = require('./config/database');
const cors = require('cors');
const rp = require('request-promise');
const morganBody  = require('morgan-body')

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

app.use(cors());

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

app.get('/', function(req, res){
    //res.render(index);
    res.render('index', {
		ashu:ashu,
	});
	console.log(ashu);
   });

// route files

let users = require('./routes/users');
app.use('/users', users);

// start server
app.listen(3005, function(){
    console.log('Server started on PORT 3005');
});
