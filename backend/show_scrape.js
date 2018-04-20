const mongoose = require('mongoose');
const config = require('./config/database');
const passport = require('passport');
const rp = require('request-promise');

let showAuto = require('./models/showAutoComplete');
let showCache = require('./models/showCache');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

let db = mongoose.connection;

//check for db errors
db.once('open', function(){
	console.log('Connected to MongoDB');
  fetchAndStoreShow()
  // fetchEpisodes()
});
db.on('error', function(err){
	console.log(err);
});

let ArrayToUse = [];

// function fetchEpisodes(){
//   showCache.find({})
//   .then((shows)=>{
//     // console.log(shows);
//     // console.log(shows);
//     shows.forEach((show)=>{
//
//       ArrayToUse.push(show.tvShowId);
//
//     })
//
//     fetchEpisodesXYZ()
//
//   })
// }

let i = 0;

// function fetchEpisodesXYZ(){
//   console.log("Fetching episodes for: ", ArrayToUse[i]);
//   var options = {
//       uri: 'http://api.tvmaze.com/shows/'+ArrayToUse[i]+'/episodes?specials=1',
//       json: true
//   };
//   rp(options)
//       .then(function (response) {
//         console.log("Fetcheddddd episodes for: ", ArrayToUse[i]);
//         showCache.update({tvShowId: ArrayToUse[i], episodes: {$exists : false}, totalEpisodeCount: {$exists : false}}, {$set: {episodes: response, totalEpisodeCount: response.length}})
//         .then((done)=>{
//           console.log("Updated to db!");
//           if(i>ArrayToUse.length){
//             console.log("DONE");
//           }else {
//             i++;
//             setTimeout(()=>{
//               fetchEpisodesXYZ();
//             }, 1200)
//           }
//         })
//     })
//     .catch(function (err) {
//         // API call failed...
//         console.log("err", err);
//     });
// }


  let page = 0;


  function fetchAndStoreShow(){
    console.log("#### FETCHING SHOWS ####");
    var options = {
    uri: 'http://api.tvmaze.com/shows?page=' + page,
    json: true
    };

    rp(options)
    .then(function (show) {
      console.log("Fetched Shows");
      console.log("Total shows found: ", show.length);

        let showPromise = show.map((each_show)=>{
          let img;
          if(each_show.image){
            img = each_show.image.medium;
          }else {
            img = '';
          }
          let objToCreate = {
            tvShowId: each_show.id,
            tvShowIMDB: each_show.externals.imdb,
            tvShowImageUrl: img,
            tvShowName: each_show.name,
            tvShowStatus: each_show.status,
            tvShowGenres: each_show.genres,
            tvShowLanguage: each_show.language,
            tvShowRating: each_show.rating.average || '',
            tvShowPremiered: each_show.premiered
          }

          return showAuto.create(objToCreate);

        })

        Promise.all(showPromise)
        .then((done)=>{
          // res.send({done})
          console.log("DONE FETCHING AND STORING!");
          if(page===145){
              console.log("Fetched All shows");
              console.log("page: ", page);
          }else {
              page++;
              console.log("page: ", page);
              setTimeout(()=>{
                fetchAndStoreShow();
              }, 600)

          }

        })

    })
    .catch(function (err) {
        // API call failed...
        console.log(err);
    });

  }
