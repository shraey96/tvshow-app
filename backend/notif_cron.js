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

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

let db = mongoose.connection;

//check for db errors
db.once('open', function(){
	console.log('Connected to MongoDB');
		notifQueryDate();
		notifQueryHour();
		// hourTest()
});
db.on('error', function(err){
	console.log(err);
});

cron.schedule('* * * * *', function(){
  console.log('running a task every minute');

});
webPushDay()
function webPushDay(){

console.log("webPushDay");
let d = new Date();
let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');

let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");


console.log("#################### running webPushDay Query");
ShowNotification.find({oneSignalDay: false})
.populate('user_id', '-password')
.populate('show_ref')
.then((notif_users)=>{
if(!notif_users){
	console.log("No users");
}else {

notif_users.forEach((notif_user)=>{
	let remindersDate = [];
	notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{


		let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
		let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')

			if(showDate.isSame(todaysDate, 'day')){

				if(notif_user.user_id.os_id){
					console.log(notif_user.show_ref.tvShowName);
					let message = `${notif_user.show_ref.tvShowName} S${user_notif_episodes.season}E${user_notif_episodes.number} will be released today!`
					push.sendWebPush([notif_user.user_id.os_id], message, function(err, response){
						if(response){
							ShowNotification.update({_id: notif_user._id, tvShowId: notif_user.show_ref.tvShowId}, {oneSignalDay: true})
							.then((msg)=>{
								console.log(msg);
							})
						}
					})


				}

			}

	})


})
}

});

}

function webPushHour(){

console.log("webPushHour");
let d = new Date();
let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');

let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");


console.log("#################### running webPushHour Query");
ShowNotification.find({oneSignalHour: false})
.populate('user_id', '-password')
.populate('show_ref')
.then((notif_users)=>{
if(!notif_users){
	console.log("No users");
}else {

notif_users.forEach((notif_user)=>{
	let remindersDate = [];
	notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{


		let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
		let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')

			if(showDate.isSame(todaysDate, 'day')){

				if(showDateTime.diff(todayAll) <= 3600000){
					if(notif_user.user_id.os_id){
						console.log(notif_user.show_ref.tvShowName);
						let message = `${notif_user.show_ref.tvShowName} S${user_notif_episodes.season}E${user_notif_episodes.number} will be released today!`
						push.sendWebPush([notif_user.user_id.os_id], message, function(err, response){
							if(response){
								ShowNotification.update({_id: notif_user._id, tvShowId: notif_user.show_ref.tvShowId}, {oneSignalHour: true})
								.then((msg)=>{
									console.log(msg);
								})
							}
						})
					}
			}



			}

	})


})
}

});

}



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
		console.log(notif_user);
		let remindersDate = [];
    notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{


			let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
			let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')

				if(showDate.isSame(todaysDate, 'day')){
					// call mailer function
					mailerDate(notif_user, user_notif_episodes)

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


				let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
				let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')

				showDateTime = (showDateTime.add(1, 'hour'));

					if(showDate.isSame(todaysDate, 'day')){


							if(showDateTime.diff(todayAll) <= 3600000){
							mailerHour(notif_user, user_notif_episodes);
						}

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
	 user: 'nitish@creativeappography.com',
	 pass: 'nitish@123'
    }
});

const mailOptions = {
  from: 'sender@email.com', // sender address
  to: `${notif_user.user_id.email}`, // list of receivers
  subject: 'Notification fron Binged.xyz!', // Subject line
	text: `${notif_user.show_ref.tvShowName}`,
  html: `<p>${notif_user.show_ref.tvShowName} S${episodes.season}E${episodes.number} will be released today! Don't miss it!</p>`// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log("err: ",  err);
   else
     console.log("Mail Sent: ", info);
});

}

function mailerHour(notif_user, episodes){
console.log("notif hour sent!");

ShowNotification.update({_id: notif_user._id, tvShowId: notif_user.show_ref.tvShowId}, {oneHour: true})
.then((msg)=>{
	console.log(msg);
})

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'nitish@creativeappography.com',
        pass: 'nitish@123'
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
