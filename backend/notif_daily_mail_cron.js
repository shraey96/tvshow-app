const mongoose = require('mongoose');
const moment = require('moment-timezone');
const config = require('./config/database');
const push = require('./push');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const cron = require('node-cron');


const User = require('./models/user');
const showCache = require('./models/showCache');
const ShowNotification = require('./models/showNotification');
const NotifReset = require('./models/notif_reset');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

let db = mongoose.connection;
//check for db errors
db.once('open', function(){
	console.log('Connected to MongoDB');
	sendDailyShows();
});
db.on('error', function(err){
	console.log(err);
});



cron.schedule('0 0 0 * * *', function(){
  console.log('running a task every midnight IST');

  sendDailyShows();

});



function sendDailyShows(){
	console.log("Running sendDailyShows");
  let d = new Date();
  let todaysDate = moment(d);

  User.find({emailNotif: true})
  .then((users)=>{

      let UserPromises = users.map((user)=>{


      return  ShowNotification.find({user_id: user._id})
        .populate('show_ref')
        .then((user_notifs)=>{

          // console.log(user_notifs);
          let notifArray = [];
          user_notifs.forEach((notif)=>{
            // console.log(notif.show_ref.episodes);

              notif.show_ref.episodes.forEach((episode)=>{
                // console.log(episode);

                // console.log(notif.show_ref.tvShowName);
                // console.log(episode);
                  	let showDate = moment(episode.airstamp)
										// console.log(showDate.format('YYYY.MM.DD'), todaysDate.format('YYYY.MM.DD'));
										// console.log(todaysDate.isSame(showDate, 'date'));

                    if(showDate.isSame(todaysDate, 'month') && showDate.isSame(todaysDate, 'year') && showDate.isSame(todaysDate, 'date')){
											console.log(notif.show_ref.tvShowName);
											console.log(showDate);
                      let objToUse = {
                        name: notif.show_ref.tvShowName,
                        showid: notif.show_ref.tvShowId,
                        season: episode.season,
                        episode_number: episode.number,
                        episode: `S${episode.season}E${episode.number}`,
                        airstamp: moment(episode.airstamp).format('MMMM Do YYYY, h:mm')
                      }
                      notifArray.push(objToUse);
                    }


              })

          })
          // console.log(user.email);
          // notifArray.length = 2
          // console.log(notifArray);
          sendMailDay(user.email, notifArray)
          // return user_notifs
        })





      })

      Promise.all(UserPromises)
      .then((done)=>{
        // console.log("Done: ", done);
        console.log("Queried all users!");
      })


  })
}



function sendMailDay(userEmail, dailyList){
  // console.log(userEmail, dailyList);

	if(dailyList.length>0){

		let mailer = nodemailer.createTransport({
			host: 'smtp.zoho.com',
			service:'Zoho',
			port:465,
			secure: false,
			auth: {
					user: 'notifications@binged.xyz',
					pass: 'bingingshows'
			}
		});

		mailer.use('compile', hbs({
			viewPath: './templates',
			extName: '.hbs'
		}))


		let mailOptions = {
		 from: 'notifications@binged.xyz',
		 to: `${userEmail}`,
		 subject: `Binged! List of episodes airing today!`,
		 template: 'daily_mail_notif',
		 context: {
		notifArray: dailyList,
		 }
		};

	  mailer.sendMail(mailOptions, (err, done)=>{
	  		if(err){
	  			console.log(err);
	  			return
	  		}else {
	  			console.log("Sent mail to: ", done);
	  		}

	})


	}



}
