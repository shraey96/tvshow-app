const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const rp = require('request-promise');

// bring in article model
let User = require('../models/user');
let TvShow = require('../models/userTVInfo');

//Register Form

router.post('/:uid/userTvInfo', function(req, res){
    TvShow.findOne({user_id:req.user._id})
    .then((user_id)=>{
        if(!user_id){
            var options = {
                uri: 'http://api.tvmaze.com/shows/'+req.body.tvid+'/episodes?specials=1',
            };
            rp(options)
                .then(function (response) {
                    response = JSON.parse(response);
                    let episodeCount = parseInt(response.length);
                    let newTvShow = new TvShow({
                        user_id:req.user._id,
                        tvShowInfo:[{
                            tvShowId : req.body.tvid,
                            tvShowIMDB: req.body.imdb,
                            tvShowName: req.body.tvname,
                            tvShowImageUrl: req.body.tvimg || '',
                            totalEpisodeCount:episodeCount
                        }]
                    });
                    newTvShow.save(function(err){
                        if(err){
                            console.log(err);
                            return;
                        }else{
                            res.send({
                              succes: true,
                              msg: "Show followed."
                            });
                        }
                    });
                })
        }else{
            console.log("jkencjkn");
        }
        })
    .catch((err)=>{
        console.log("catcherorro",err);
    })

})

router.post('/register', function(req, res){

    User.findOne({'email': req.body.email})
    .then((user)=>{
        if(user){
            res.send({
                success:false,
                msg:"User Already Exists.",
            })

        }else{
            bcrypt.genSalt(10, function(err, salt){
                            bcrypt.hash(req.body.password, salt, function(err, hash){
                                if(err){
                                    console.log(err);
                                }
                                req.body.password = hash;
                                User.create(req.body)
                                .then((newuser)=>{
                                    res.send({
                                        success:true,
                                        msg:"User Created.",
                                    })
                                })
                            });
                });
            }
        })
    .catch((err)=>{
    })

});

//Login Process
router.post('/login', function(req, res, next){
  console.log(req.body);
    passport.authenticate("local", function(err, user, info){
        if(err){return next(err); }
        if(!user){return res.send({
            success:false,
            user:null,
            msg:"Wrong Email Or Password Incorrect."
        });}
            req.logIn(user, function(err){
                if(err){ return next(err);}
                return res.send({
                    success:true,
                    user:user,
                    msg:"authenticated."
                })
            })
    })(req, res, next);

});

// Logout

router.get('/logout', function(req, res){
    req.logout();
    res.send({
        success:true,
        msg:"User Logged Out."
    });
});

router.get('/test', function(req, res){
    res.send({
        user:req.user
    });
});


module.exports = router;
