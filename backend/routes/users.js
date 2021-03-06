const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const rp = require('request-promise');
const passportGoogle = require('../config/passport-google');

// bring in models
let User = require('../models/user');
let showCache = require('../models/showCache');
let TvShow = require('../models/userTVInfo');
let showAuto = require('../models/showAutoComplete');
let ShowNotification = require('../models/showNotification');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.json({
            success:false,
            msg:"not authenticated"
        });
	}
}

router.get('/shows', function(req, res){

  let perPage = 52;
  let page = req.query.page || 1;
  let skips = ((perPage * page) - perPage);

  let query;
  console.log("req.query: ", req.query);

  if(req.query.genres || req.query.status || req.query.rating || req.query.language){
    console.log("some query present");

		if(req.query.genres && req.query.status && req.query.rating && req.query.language){
			console.log("all 3 present");
			query = {tvShowStatus: req.query.status, tvShowRating: {$gte: req.query.rating}, tvShowGenres: req.query.genres, tvShowLanguage: req.query.language};
		}

		else if(req.query.genres && req.query.status && req.query.rating){
			console.log("genres, status and rating present");
			query = {tvShowStatus: req.query.status, tvShowRating: {$gte: req.query.rating}, tvShowGenres: req.query.genres};
		}else if(req.query.status && req.query.rating && req.query.language){
			console.log("status, rating and language present");
			query = {tvShowStatus: req.query.status, tvShowRating: {$gte: req.query.rating}, tvShowLanguage: req.query.language};
		}else if(req.query.genres && req.query.rating && req.query.language){
			console.log("genres, rating and language present");
			query = {tvShowRating: {$gte: req.query.rating}, tvShowGenres: req.query.genres, tvShowLanguage: req.query.language};
		}else if(req.query.genres && req.query.status && req.query.language){
			console.log("genres, status and language present");
			query = {tvShowStatus: req.query.status, tvShowGenres: req.query.genres, tvShowLanguage: req.query.language};
		}

		else if(req.query.genres && req.query.status){
			console.log("genres and status present");
			query = {tvShowGenres: req.query.genres, tvShowStatus: req.query.status};
		}else if(req.query.genres && req.query.rating){
			console.log("genres and rating present");
			query = {tvShowGenres: req.query.genres, tvShowRating: {$gte: req.query.rating}};
		}else if(req.query.genres && req.query.language){
			console.log("genres and language present");
			query = {tvShowGenres: req.query.genres, tvShowLanguage: req.query.language};
		}
		else if(req.query.status && req.query.rating){
			console.log("status and rating present");
			query = {tvShowStatus: req.query.status, tvShowRating: {$gte: req.query.rating}};
		}else if(req.query.status && req.query.language){
			console.log("status and language present");
			query = {tvShowStatus: req.query.status,  tvShowLanguage: req.query.language};
		}
		else if(req.query.language && req.query.rating){
			console.log("language and rating present");
			query = {tvShowLanguage: req.query.language, tvShowRating: {$gte: req.query.rating}};
		}

		else if(req.query.genres){
			console.log("genres present");
			query = {tvShowGenres: req.query.genres};
		}else if(req.query.status){
			console.log("status present");
			query = {tvShowStatus: req.query.status};
		}else if(req.query.rating){
			console.log("rating present");
			query = {tvShowRating: {$gte: req.query.rating}};
		}else if(req.query.language){
			console.log("language present");
			query = {tvShowLanguage: req.query.language};
		}

    // if(req.query.genres && req.query.status && req.query.rating){
    //   console.log("all 3 present");
    //   query = {tvShowStatus: req.query.status, tvShowRating: {$gte: req.query.rating}, tvShowGenres: req.query.genres};
    // }else if(req.query.genres && req.query.status){
    //   console.log("genres and status present");
    //   query = {tvShowGenres: req.query.genres, tvShowStatus: req.query.status};
    // }else if(req.query.genres && req.query.rating){
    //   console.log("genres and rating present");
    //   query = {tvShowGenres: req.query.genres, tvShowRating: {$gte: req.query.rating}};
    // }else if(req.query.status && req.query.rating){
    //   console.log("status and rating present");
    //   query = {tvShowStatus: req.query.status, tvShowRating: {$gte: req.query.rating}};
    // }else if(req.query.genres){
    //   console.log("genres present");
    //   query = {tvShowGenres: req.query.genres};
    // }else if(req.query.status){
    //   console.log("status present");
    //   query = {tvShowStatus: req.query.status};
    // }else if(req.query.rating){
    //   console.log("rating present");
    //   query = {tvShowRating: {$gte: req.query.rating}};
    // }

    showAuto.find({})
    .count()
    .then((count)=>{
      showAuto.find(query)
      .skip(skips)
      .limit(perPage)
      .sort()
      .then((shows)=>{
        res.json({success: true, shows: shows, totalCount: count, countPerPage: Math.ceil(count/perPage)})
      })
    })

  }else {
    query = {};
    showAuto.find({})
    .count()
    .then((count)=>{
      showAuto.find(query)
      .skip(skips)
      .limit(perPage)
      .then((shows)=>{
        res.json({success: true, shows: shows, totalCount: count, countPerPage: Math.ceil(count/perPage)})
      })
    })
  }




})





// router.get('/auto', function(req, res){
//
// let page = 0;
//
//
// fetchAndStoreShow()
//   function fetchAndStoreShow(){
//     console.log("#### FETCHING SHOWS ####");
//     var options = {
//     uri: 'http://api.tvmaze.com/shows?page=' + page,
//     json: true
//     };
//
// rp(options)
//     .then(function (show) {
//       console.log("Fetched Shows");
//       console.log("Total shows found: ", show.length);
//
//         let showPromise = show.map((each_show)=>{
//           let objToCreate = {
//             tvShowId: each_show.id,
//             tvShowIMDB: each_show.externals.imdb,
//             tvShowImageUrl: each_show.image.medium || '',
//             tvShowName: each_show.name,
//             tvShowStatus: each_show.status,
//             tvShowGenres: each_show.genres,
//             tvShowLanguage: each_show.language,
//             tvShowRating: each_show.rating.average || '',
//             tvShowPremiered: each_show.premiered
//           }
//
//           return showAuto.create(objToCreate);
//
//         })
//
//         Promise.all(showPromise)
//         .then((done)=>{
//           // res.json({done})
//           console.log("DONE FETCHING AND STORING!");
//           if(page===145){
//               console.log("Fetched All shows");
//               console.log("page: ", page);
//               res.json({succes: true, done: "ALL"})
//           }else {
//               page++;
//               console.log("page: ", page);
//               setTimeout(()=>{
//                 fetchAndStoreShow();
//               },1500)
//           }
//           // if(page<2){
//           //   page++;
//           //   console.log("page: ", page);
//           //   fetchAndStoreShow()
//           // }else {
//           //   console.log("Fetched All shows");
//           //   console.log("page: ", page);
//           //   res.json({succes: true, done: "ALL"})
//           // }
//         })
//
//     })
//     .catch(function (err) {
//         // API call failed...
//     });
//
//   }
//
//
// })


router.get('/tvseries',ensureAuthenticated, function(req, res){
    TvShow.findOne({user_id:req.user._id})
    .populate('user_id', '-password')
    .populate('tvShowInfo.show_ref')
    .then((user)=>{
        if(user){
            res.json({
                success:true,
                info:user
            })
        }else{
            res.json({
                success:false,
                info: ''
            })
        }
    })
});

router.get('/profile', ensureAuthenticated, function(req, res){
    User.findOne({_id:req.user._id})
    .then((user)=>{
        if(user){
            res.json({
                success:true,
                info:user
            })
        }else{
            res.json({
                success:false,
                info: 'User not Found'
            })
        }
    })
});

router.put('/profile', ensureAuthenticated, function(req, res){

	if(typeof req.body.oneSignalNotif !== undefined){
		ShowNotification.update({user_id: req.user._id}, {$set: {oneSignalDay: req.body.oneSignalNotif, oneSignalHour: req.body.oneSignalNotif}}, {multi: true})
	}

	if(typeof req.body.emailNotif !== undefined){
		ShowNotification.update({user_id: req.user._id}, {$set: {emailDay: req.body.emailNotif, emailHour: req.body.emailNotif}}, {multi: true})
		}

    User.update({_id: req.user._id}, req.body, function(err, raw) {
        if (err) {
          res.json(err);
        }
        User.findOne({_id:req.user._id})
        .then((user)=>{
            if(user){
                res.json({
                    success:true,
                    info:user
                })
            }else{
                res.json({
                    success:false,
                    info: 'User not Found'
                })
            }
        })
    });

});


router.put('/episodeWatched',ensureAuthenticated, function(req, res){
    if(req.body.request==="add"){

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

								var options2 = {
									uri: 'https://api.tvmaze.com/shows/'+req.body.tvid+'?embed=cast',
				          json: true
								}

								rp(options2)
											.then(function(response2){

												let objToCreate = {
						              tvShowId : response2.id,
						              tvShowIMDB: response2.externals.imdb || '',
						              tvShowImageUrl: response2.image.medium || '',
						              tvShowName: response2.name,
						              totalEpisodeCount: response.length,
						              episodes: response
						            }

						            showCache.create(objToCreate)
						            .then((show)=>{
						              proceedToAdd(show)
						            })


											})



		          })
		    }
		  })


			function proceedToAdd(show){
				TvShow.findOne({user_id: req.user._id,"tvShowInfo.tvShowId":req.body.tvid})
				.then((user)=>{
					if(user){

						    TvShow.update(
						        { user_id: req.user._id ,
						        "tvShowInfo.tvShowId":req.body.tvid},
						        { $addToSet: { "tvShowInfo.$.episodeWatched" : { $each: req.body.episodeid  }}}
						    )
						        .then((done) => {
						            if(done){

						                  TvShow.findOne({user_id: req.user._id})
						                  .populate('tvShowInfo.show_ref')
						                  .then((user)=>{
						                    res.json({
						                        success: true,
						                        msg: "Episode Added",
						                        user: user
						                      });
						                  })


						            }else{
						                res.json({
						                    success:false,
						                    msg: "Episode already Exist"
						                })
						            }
						        })

					}else {


						let updateObj = {
											tvShowId : parseInt(req.body.tvid),
											show_ref : show._id,
											episodeWatched : req.body.episodeid
						}

						TvShow.update(
								{ user_id: req.user._id } ,
								{ $addToSet: { "tvShowInfo" : updateObj}}
						).then((done)=>{
							TvShow.findOne({user_id: req.user._id})
							.populate('tvShowInfo.show_ref')
							.then((user)=>{
							res.json({
									success: true,
									msg: "Episode Added.",
									user: user
							});
							req.body.show_ref = show._id;
							req.body.user_id = req.user._id;
							req.body.tvShowId = req.body.tvid;
							req.body.oneSignalDay = !req.user.oneSignalNotif;
							req.body.oneSignalHour = !req.user.oneSignalNotif;
							req.body.emailDay = !req.user.emailNotif;
							req.body.emailHour = !req.user.emailNotif;
							ShowNotification.create(req.body).then((notification)=>{
									console.log("notification created!");
							})


		})
						})

			}

    })
	}
}		else{
        TvShow.update(
            { user_id: req.user._id ,
            "tvShowInfo.tvShowId":req.body.tvid},
            { $pullAll: { "tvShowInfo.$.episodeWatched" : req.body.episodeid  }},
        )
            .then((done) => {
                if(done){
                    TvShow.findOne({user_id: req.user._id})
                        .populate('tvShowInfo.show_ref')
                        .then((user)=>{
                        res.json({
                            success: true,
                            msg: "Episode Deleted.",
                            user: user
                        });
                    });
                }else{
                    res.json({
                        success:false,
                        msg: "Episode Not Found"
                    })
                }
            })
    }
	})



router.post('/userTvInfo/follow',ensureAuthenticated, function(req, res){

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
              tvShowIMDB: req.body.imdb || '',
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
                res.json({
                    success: true,
                    msg: "Show followed.",
                    result: user
                });
                req.body.show_ref = show._id;
                req.body.user_id = req.user._id;
                req.body.tvShowId = req.body.tvid;
								req.body.oneSignalDay = !req.user.oneSignalNotif;
								req.body.oneSignalHour = !req.user.oneSignalNotif;
								req.body.emailDay = !req.user.emailNotif;
								req.body.emailHour = !req.user.emailNotif;
                ShowNotification.create(req.body).then((notification)=>{
                    console.log("notification created!");
                })


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
                   res.json({
                      success: true,
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
                                res.json({
                                  success: true,
                                  msg: "Show followed.",
                                  result: user
                                });
                              })

                                console.log("create notif");

                              req.body.show_ref = show._id;
                              req.body.user_id = req.user._id;
															req.body.tvShowId = req.body.tvid;
															req.body.oneSignalDay = !req.user.oneSignalNotif;
															req.body.oneSignalHour = !req.user.oneSignalNotif;
															req.body.emailDay = !req.user.emailNotif;
															req.body.emailHour = !req.user.emailNotif;
                              ShowNotification.create(req.body).then((notification)=>{
                                console.log("notification created");
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

router.post('/deleteNotification',ensureAuthenticated, function (req, res) {
    ShowNotification.update(
        { user_id: req.user._id },
        { $remove: { tvShowId: req.body.tvid } },
    )
})


router.post('/userTvInfo/unfollow',ensureAuthenticated, function (req, res) {
    TvShow.update(
        { user_id: req.user._id },
        { $pull: { tvShowInfo: { tvShowId: req.body.tvid } } },
    )
        .then((done) => {
            TvShow.findOne({user_id: req.user._id})
                .populate('tvShowInfo.show_ref')
                .then((user)=>{
                res.json({
                    success: true,
                    msg: "Show unfollowed.",
                    result: user
                });

								ShowNotification.remove({ user_id: req.user._id, tvShowId: req.body.tvid })

                });
        })
});


// router.put('/episodeWatched', function(req, res){
//     TvShow.update(
//         { user_id: req.user._id ,
//         "tvShowInfo.tvShowId":req.body.tvid},
//         { $addToSet: { "tvShowInfo.$.episodeWatched" : req.body.episodeid  } },
//         )
//         .then((done) => {
//             if(done){
//                 TvShow.findOne({user_id: req.user._id})
//                           .populate('tvShowInfo.show_ref')
//                           .then((user)=>{
//                             res.json({
//                               success: true,
//                               msg: "Episode Added.",
//                               result: user
//                             });
//                           });
//             }else{
//                 res.json({
//                     success:false,
//                     msg: "Episode already Exist"
//                 })
//             }
//         })
// });

router.post('/register', function (req, res, next) {
    req.body.checkPassword = req.body.password;
    User.findOne({ 'email': req.body.email })
        .then((user) => {
            if (user) {
                res.json({
                    success: false,
                    msg: "User Already Exists.",
                })

            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                        }
                        req.body.password = hash;
                        User.create(req.body)
                            .then((newuser) => {
                                res.json({
                                    success: true,
                                    msg: "User Created.",
                                })
                                let newUser = {
                                    user_id: newuser._id,
                                    tvShowInfo: []
                                }

                                TvShow.create(newUser)
                                    .then((userRegister) => {
                                        req.body.password = req.body.checkPassword;
                                        passport.authenticate("local", function (err, user, info) {
                                            if (err) { return next(err); }
                                            req.logIn(user, function (err) {
                                                if (err) { return next(err); }
                                            })
                                        })(req, res, next);
                                    })
                            })
                    });
                });
            }
        })
        .catch((err) => {

        })
});

router.put('/updatePassword', function(req, res){
    User.findOne({_id:req.user._id})
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.old, user.password, function(err, isMatch){
                    if(err) throw err;
                    if(isMatch){
                        bcrypt.genSalt(10, function(err, salt){
                            bcrypt.hash(req.body.new, salt, function(err, hash2){
                                if(err){
                                    console.log(err);
                                }
                                req.body.new = hash2;
                        User.update({_id: user._id}, {password: req.body.new}, function(err, raw) {
                            res.send({
                                success:true,
                                msg:"password changed"
                            })
                        })
                    });
                });
                }else{
                    res.send({
                        success:false,
                        msg:"old password doesnot match"
                    })
                }
            });
            }else{
                res.json({
                    success:false,
                    info: 'User not Found'
                })
            }
        });
})

//Login Process
router.post('/login', function(req, res, next){
    passport.authenticate("local", function(err, user, info){
        if(err){return next(err); }
        if(!user){return res.json({
            success:false,
            user:null,
            msg:"Wrong Email Or Password Incorrect."
        });}
            req.logIn(user, function(err){
                if(err){ return next(err);}
                TvShow.findOne({user_id: req.user._id})
                    .populate('tvShowInfo.show_ref')
										.populate('user_id')
                    .then((userData)=>{
                    res.json({
                        success: true,
                        msg: "authenticated.",
                        result: userData
                    });



                });
            })
    })(req, res, next);

});



router.post('/login/social', function(req, res, next){

	passport.authenticate('custom', function(err, user, info){
			  req.logIn(user, function(err){
					let newUser = {
						user_id: user._id,
						tvShowInfo:[]
					}

					TvShow.findOne({user_id: user._id})
					.then((user_tv)=>{
						if(user_tv){
							TvShow.findOne({user_id: req.user._id})
									.populate('tvShowInfo.show_ref')
									.populate('user_id')
									.then((userData)=>{
									res.json({
											success: true,
											msg: "authenticated.",
											result: userData
									});
								})
						}else {
							TvShow.create(newUser)
							.then(()=>{
								TvShow.findOne({user_id: req.user._id})
										.populate('tvShowInfo.show_ref')
										.populate('user_id')
										.then((userData)=>{
										res.json({
												success: true,
												msg: "authenticated.",
												result: userData
										});
									})
							})
						}
					})

					// TvShow.create(newUser)
					// .then(()=>{
					// 	TvShow.findOne({user_id: req.user._id})
					// 			.populate('tvShowInfo.show_ref')
					// 			.populate('user_id')
					// 			.then((userData)=>{
					// 			res.json({
					// 					success: true,
					// 					msg: "authenticated.",
					// 					result: userData
					// 			});
					// 		})
					// })

			})

	})(req, res, next);


})



// Logout
router.get('/logout', function(req, res){
	// console.log("LOGOUT: ", req.user._id);
	if(req.user){
			User.update({_id: req.user._id},{$unset: {os_id: 1}})
	}
    req.logout();
    res.json({
        success:true,
        msg:"User Logged Out."
    });

});

router.put('/login/osid', function(req, res){
User.update({_id: req.user._id},{os_id: req.body.osid})
.then((done)=>{
	res.json({succes: true, msg: "OS_ID updated!"});
})
});

router.post('/notification', function(req, res){
    ShowNotification.create(req.body).then((notification)=>{
        res.json({
            notification
        });
    });
});


module.exports = router;
