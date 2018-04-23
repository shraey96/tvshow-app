const mongoose = require('mongoose');
const moment = require('moment-timezone');

const config = require('./config/database');

const nodemailer = require('nodemailer');
const cron = require('node-cron');


const User = require('./models/user');
const showCache = require('./models/showCache');
const ShowNotification = require('./models/showNotification');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

let db = mongoose.connection;

//check for db errors
db.once('open', function(){
	console.log('Connected to MongoDB');
		// notifQueryDate();
		// notifQueryHour();
});
db.on('error', function(err){
	console.log(err);
});

cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
	notifQueryDate();
	notifQueryHour();
});

// let d = new Date();
// console.log(d);
// console.log(moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm:ss a"));

// let todaysDate = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY");
// let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');
// console.log(todaysDate, typeof todaysDate);
//
// let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");
// console.log(todayAll);

// console.log(moment.tz.guess(d));
// console.log(moment.tz.guess("2014-04-07T02:00:00+00:00"));
// console.log(moment());
// runNotifQuery()
function notifQueryDate(){
	console.log("notifQueryDate");
	let d = new Date();
	let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');
	console.log(todaysDate, typeof todaysDate);

	let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");
	console.log(todayAll);


console.log("#################### running Date Query");
ShowNotification.find({oneDay: false})
.populate('user_id', '-password')
.populate('show_ref')
.then((notif_users)=>{
  if(!notif_users){
    console.log("No users");
  }else {
  // console.log(notif_users);
  notif_users.forEach((notif_user)=>{
    // console.log(notif_user.show_ref.episodes[0]);
		let remindersDate = [];
    notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{

      // for hourly notif


			let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
			let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')
			// console.log(showDateTime);
        // console.log((today).isValid());
				// console.log(lessThanOneHourAgo(showDateTime));
				// console.log(showDate.isSame(todaysDate));
				// console.log(showDate, todaysDate);
				if(showDate.isSame(todaysDate, 'day')){
					// call mailer function
					mailerDate(notif_user, user_notif_episodes)
						// if(lessThanOneHourAgo(showDateTime, todayAll) === true){
						// 	mailerHour(notif_user)
						// }
				}

    })


  })
  }

});
}

function notifQueryHour(){
	console.log("####################Runin Notif Query Hours");
	let d = new Date();
	let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');
	console.log(todaysDate, typeof todaysDate);

	// let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");
	// console.log(todayAll);

	let todayAll = moment(d).tz('Asia/Calcutta');
	console.log(todayAll);

	ShowNotification.find({oneHour: false})
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

	      // for hourly notif


				let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
				let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')
				// console.log(showDateTime);
				// console.log(todayAll.hour());
				// console.log(showDateTime.hour());
				showDateTime = (showDateTime.add(1, 'hours'));
				console.log(showDateTime.hours(), todayAll.hours());
				console.log(showDateTime.add(60, 'minutes'));
				// console.log(showDateTime.hours());
				// console.log(showDateTime.hour() >= todayAll.hour());
	        // console.log((today).isValid());
					// console.log(lessThanOneHourAgo(showDateTime, todayAll));
					if(showDate.isSame(todaysDate, 'day')){
						// call mailer function
						// mailerDate(notif_user)
						if(showDateTime.hours() === todayAll.hours()){
							console.log('SENDING HOUR');
							mailerHour(notif_user, user_notif_episodes);
						}

						if(showDateTime.hours() === todayAll.hours()){
							// console.log("Y");
							if(showDateTime.minutes() === todayAll.minutes())
							console.log('SENDING MINUTE');
							mailerHour(notif_user, user_notif_episodes);
						}
							// if(lessThanOneHourAgo(showDateTime, todayAll) === true){
							// 	mailerHour(notif_user)
							// }
					}

	    })


	  })
	  }

	});

}

// runNotifQuery()

function mailerDate(notif_user, episodes){
console.log("Notif Sent!");
// console.log("notif_user: ", notif_user);
// console.log("episodes: ", episodes);
ShowNotification.update({_id: notif_user._id, tvShowId: notif_user.show_ref.tvShowId}, {oneDay: true})
.then((msg)=>{
	// console.log(msg);
})

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'shraey96@gmail.com',
        pass: ''
    }
});

const mailOptions = {
  from: 'sender@email.com', // sender address
  to: `${notif_user.user_id.email}`, // list of receivers
  subject: 'Notification fron Binged.xyz!', // Subject line
	text: `${notif_user.show_ref.tvShowName}`,
  html: `<p>${notif_user.show_ref.tvShowName} S${episodes.season}E${episodes.number} will be released today! Go watch it now!</p>`// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log("err: ",  err);
   else
     console.log("Mail Sent: ", info);
});

}

function mailerHour(notif_user){
console.log("notif hour sent!");

ShowNotification.update({_id: notif_user._id}, {oneHour: true})
.then((msg)=>{
	console.log(msg);
})

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'shraey96@gmail.com',
        pass: ''
    }
});

const mailOptions = {
  from: 'sender@email.com', // sender address
  to: `${notif_user.user_id.email}`, // list of receivers
  subject: 'Notification fron Binged.xyz!', // Subject line
	text: `${notif_user.show_ref.tvShowName}`,
  html:`<p>${notif_user.show_ref.tvShowName} S${episodes.season}E${episodes.number} will be releasing in 1 hour! Go watch it now!</p>`// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});

}

function lessThanOneHourAgo(date, todayAll){
    return moment(date).isAfter(moment(todayAll).subtract(1, 'hours'));
}
