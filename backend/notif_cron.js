const mongoose = require('mongoose');
const moment = require('moment-timezone');

const config = require('./config/database');


const User = require('./models/user');
const showCache = require('./models/showCache');
const ShowNotification = require('./models/showNotification');

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

let d = new Date();
// console.log(d);
// console.log(moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm:ss a"));

let todaysDate = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY");
// console.log(todaysDate, typeof todaysDate);

let today = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, , h:mm");
console.log(today);

// console.log(moment.tz.guess(d));
// console.log(moment.tz.guess("2014-04-07T02:00:00+00:00"));
// console.log(moment());

function runNotifQuery(){
  console.log("running Query");
ShowNotification.find({})
.populate('user_id', '-password')
.populate('show_ref')
.then((notif_users)=>{
  if(!notif_users){
    console.log("No users");
  }else {
  // console.log(notif_users);
  notif_users.forEach((notif_user)=>{
    // console.log(notif_user.show_ref.episodes[0]);

    notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{
      // console.log(user_notif_episodes.airdate);
      // console.log(moment(user_notif_episodes.airstamp).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm:ss a"));

      // for date notif.

      // let date = moment(user_notif_episodes.airstamp).tz('Asia/Calcutta').format("MMMM Do YYYY");
      // // console.log(todaysDate);
      // if(todaysDate===(date)){
      //   console.log("yes");
      // }else {
      //   // console.log("NO");
      // }


      // for hourly notif

      let today = moment(user_notif_episodes.airstamp).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");
        // console.log(today);
        console.log(moment(today).isValid());
        // console.log((today).add(10, 'minutes'));
    })

  })
  }

});
}

runNotifQuery()
