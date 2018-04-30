const User = require('../models/user');
const config = require('../config/database');
const CustomStrategy = require('passport-custom').Strategy;
const passport = require('passport');
const FB = require('fb');
const rp = require('request-promise');


passport.use(new CustomStrategy(
  function(req, done) {

      if(req.body.type==='google'){
        console.log("Google.");
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
}else if(req.body.type==='facebook'){
  console.log("Facebook");
        User.findOne({facebook_id: req.body.fbid}, function (err, user) {

          if(user){
              return done(err, user);
          }else {

            FB.api('me', { fields: ['id', 'name', 'picture.type(large)', 'email'], access_token: req.body.fb_token }, function (result) {

              // console.log(result);

              let objToCreate = {
                facebook_id: result.id,
                username: result.name,
                email: result.email,
                profile_Img: result.picture.data.url
              }

              User.create(objToCreate)
              .then((newUser)=>{
                done(err, newUser)
              })

            })

          }

        })




}







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


module.exports = passport;
