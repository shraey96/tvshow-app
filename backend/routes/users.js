const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const rp = require('request-promise');

// bring in models
let User = require('../models/user');
let showCache = require('../models/showCache');
let TvShow = require('../models/userTVInfo');


router.get('/tvseries', function(req, res){
    TvShow.findOne({user_id:req.user._id})
    .populate('user_id', '-password')
    .populate('tvShowInfo.show_ref')
    .then((user)=>{
        if(user){
            res.send({
                success:true,
                info:user
            })
        }else{
            res.send({
                success:false,
                user: null
            })
        }
    })
});



router.put('/episodeWatched', function(req, res){
    if(req.body.request==="add"){
    TvShow.update(
        { user_id: req.user._id ,
        "tvShowInfo.tvShowId":req.body.tvid},
        { $addToSet: { "tvShowInfo.$.episodeWatched" : req.body.episodeid  }}
    )

    // let query = { user_id: req.user._id , "tvShowInfo.tvShowId":req.body.tvid};
    // let update = { $addToSet: { "tvShowInfo.$.episodeWatched" : req.body.episodeid  } };
    // let options = {new: true, upsert: true}
    //   TvShow.findOneAndUpdate (query, update, options, function(err, result){
    //     if(result){
    //               res.send({
    //                   succes: true,
    //                   msg: "Episode Added",
    //                   result: result
    //                 });
    //     }
    //   })

        .then((done) => {
            if(done){
              console.log(done);
                // res.send({
                //     succes: true,
                //     msg: "Episode Added"
                  // });
                  TvShow.findOne({user_id: req.user._id})
                  .populate('tvShowInfo.show_ref')
                  .then((user)=>{
                    res.send({
                        succes: true,
                        msg: "Episode Added",
                        user: user
                      });
                  })


            }else{
                res.send({
                    success:false,
                    msg: "Episode already Exist"
                })
            }
        })
    }else{
        TvShow.update(
            { user_id: req.user._id ,
            "tvShowInfo.tvShowId":req.body.tvid},
            { $pull: { "tvShowInfo.$.episodeWatched" : req.body.episodeid  } },
        )
            .then((done) => {
                if(done){
                    res.send({
                        succes: true,
                        msg: "Episode Deleted"
                    });
                }else{
                    res.send({
                        success:false,
                        msg: "Episode Not Found"
                    })
                }
            })
    }
});


router.post('/userTvInfo', function(req, res){

  showCache.findOne({tvShowId: req.body.tvid})
  .then((show)=>{

    if(show){
      console.log("show found!");
      proceedToAdd(show)
    }else {
      console.log("show not found!");
      var options = {
          uri: 'http://api.tvmaze.com/shows/'+req.body.tvid+'/episodes?specials=1',
          json: true
      };
      rp(options)
          .then(function (response) {

            let objToCreate = {
              tvShowId : req.body.tvid,
              tvShowIMDB: req.body.imdb,
              tvShowImageUrl: req.body.tvimg || '',
              tvShowName: req.body.tvname,
              totalEpisodeCount: response.length,
              episodes: response
            }

            showCache.create(objToCreate)
            .then((show)=>{
              proceedToAdd(show)
            })

          })
    }
  })


function proceedToAdd(show){
  TvShow.findOne({user_id:req.user._id})
  .then((user_id)=>{
      if(!user_id){


                  let episodeCount = (show.episodes.length);
                  let newTvShow = new TvShow({
                      user_id:req.user._id,
                      tvShowInfo:[{
                          tvShowId : parseInt(req.body.tvid),
                          show_ref : show._id
                      }]
                  });
                  newTvShow.save(function(err){
                      if(err){
                          console.log(err);
                          return;
                      }else{
                          TvShow.findOne({user_id: req.user._id})
                          .populate('tvShowInfo.show_ref')
                          .then((user)=>{
                            res.send({
                              succes: true,
                              msg: "Show followed.",
                              result: user
                            });
                          })
                      }
                  });

      }else{

          TvShow.findOne(
              {user_id: req.user._id,
              "tvShowInfo.tvShowId":req.body.tvid}
          )
          .populate('tvShowInfo.show_ref')
           .then((tv)=>{
               if(tv){
                   res.send({
                      succes: true,
                      msg: "Show Exist.",
                      tv:tv
                    });
               }
               else{
                   console.log("not present");

                          let tvShowInfo = {
                                      tvShowId : req.body.tvid,
                                      show_ref: show._id
                                  };
                          TvShow.update(
                              { user_id: req.user._id },
                              { $push: { tvShowInfo: tvShowInfo } }
                          )
                          .then((done)=>{

                              TvShow.findOne({user_id: req.user._id})
                              .populate('tvShowInfo.show_ref')
                              .then((user)=>{
                                res.send({
                                  succes: true,
                                  msg: "Show followed.",
                                  result: user
                                });
                              })

                          })
               }
           })

      }
      })
  .catch((err)=>{
      console.log("catch errorr: ",err);
  });
}

});


router.post('/userTvInfo/unfollow', function (req, res) {
    TvShow.update(
        { user_id: req.user._id },
        { $pull: { tvShowInfo: { tvShowId: req.body.tvid } } },
    )
        .then((done) => {
            res.send({
                succes: true,
                msg: "Unfollowed"
            });
        })
});


router.put('/episodeWatched', function(req, res){
    TvShow.update(
        { user_id: req.user._id ,
        "tvShowInfo.tvShowId":req.body.tvid},
        { $addToSet: { "tvShowInfo.$.episodeWatched" : req.body.episodeid  } },
        )
        .then((done) => {
            if(done){
                res.send({
                    succes: true,
                    msg: "Episode Added"
                });
            }else{
                res.send({
                    success:false,
                    msg: "Episode already Exist"
                })
            }
        })
});

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
