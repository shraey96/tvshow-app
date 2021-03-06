const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');


module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },function(email, password, done){
        //match username
        let query = {email:email};
        console.log("came in passport");
        console.log(email);
        console.log(password);
        User.findOne(query, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false);
            }

            // match password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }   else{
                    return done(null, false);
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
        done(err, user);
    });
});
}
