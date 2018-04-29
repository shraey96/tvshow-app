const User = require('../models/user');
const config = require('../config/database');
const GoogleStrategy = require('passport-google-auth').Strategy;
const GoogleTokenStrategy = require('passport-google-auth').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const passport = require('passport');
const rp = require('request-promise');
// change cliendID to clientid

// passport.use(new GoogleStrategy({
//     clientId: "826343597365-4mnq7r5ro06nnocd08ogumcg584si15d.apps.googleusercontent.com",
//     clientSecret: "FGY1JZflbHWSStqYBUtNM4g6",
//     callbackURL: "http://127.0.0.1:3000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log("ADSADS");
//        // User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
//        //   return done(err, user);
//        // });
//   }
// ));

// passport.use(new GoogleTokenStrategy({
//     clientId: `826343597365-4mnq7r5ro06nnocd08ogumcg584si15d.apps.googleusercontent.com`,
//     clientSecret: `FGY1JZflbHWSStqYBUtNM4g6`,
//     callbackURL: "http://localhost:3000/auth/google/redirect"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log("sdad");
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));


passport.use(new CustomStrategy(
  function(req, done) {
         User.findOne({
           google_id: req.body.google_id
         }, function (err, user) {
           if(user){
            return done(err, user);
           }else {
             let options = {
                uri: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + req.body.id_token,
                json: true
                };

            rp(options)
                .then(function (guser) {

              let objToCreate = {
                username: guser.name,
                email: guser.email,
                profile_Img: guser.picture + '?sz=250',
                google_id: req.body.google_id
              }
              User.create(objToCreate)
              .then((newUser)=>{
                done(err, newUser)
              })
   });
           }
           // done(err, user);


       })

       passport.serializeUser(function(user, done) {
           done(null, user.id);
       });

       passport.deserializeUser(function(id, done) {
           User.findById(id, function(err, user) {
           done(err, user);
       });
     })

  }
));

// passport.use(new GoogleTokenStrategy({
//     clientID: "GOOGLE_CLIENT_ID",
//     clientSecret: GOOGLE_CLIENT_SECRET
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

module.exports = passport;
