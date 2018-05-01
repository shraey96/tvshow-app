const mongoose = require('mongoose');
const moment = require('moment-timezone');
const config = require('./config/database');

const cron = require('node-cron');


const User = require('./models/user');
const showCache = require('./models/showCache');
const ShowNotification = require('./models/showNotification');
const NotifReset = require('./models/notif_reset');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

let db = mongoose.connection;

db.once('open', function(){
	console.log('Connected to MongoDB');
	// resetNotif()
});
db.on('error', function(err){
	console.log(err);
});

cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
  resetNotif();
});

function resetNotif(){
  console.log("Running RESET NOTIF");
  let d = new Date();
  let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');


  NotifReset.find()
  .populate('user_id')
  .then((users)=>{
    if(!users){
      console.log("A");
    }
      users.forEach((user)=>{
        console.log(user);
        console.log(user.timeRun);
        let resetDate = moment(user.timeRun);
        // console.log(resetDate.isValid());
          console.log( moment(user.timeRun).format('MMMM Do YY'));


                    let userEmailNotif = user.user_id.emailNotif;
                    let userOSNotif = user.user_id.oneSignalNotif;
                    let user_id = user.user_id._id;
                    let tvShowId = user.tvShowId;
                    // console.log(userEmailNotif, userOSNotif, tvShowId);
                    // console.log(user._id);

        if(resetDate.isSame(todaysDate, 'day')){
          console.log("Resetting! ");

          let updateObj = {
            tvShowId: tvShowId,
            oneSignalDay: userOSNotif,
            oneSignalHour: userOSNotif,
            emailDay: userEmailNotif,
            emailHour: userEmailNotif
          }

          ShowNotification.update({user_id: user_id}, updateObj)
          .then((done)=>{

            NotifReset.remove({user_id: user_id});
            NotifReset.remove({_id: user._id}, function(err, res){
            })

          })


        }else {
        	console.log("NOT RESETTING");
        }

      })


  })


}
