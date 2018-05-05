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
		// notifQueryDate();
		notifQueryHour();
		// webPushDay()
		// webPushHour()
});
db.on('error', function(err){
	console.log(err);
});

cron.schedule('* * * * *', function(){
  console.log('running a task every minute');

	// notifQueryDate();
	notifQueryHour();
	// webPushDay();
	// webPushHour();


});


//
// function webPushDay(){
//
// console.log("webPushDay");
// let d = new Date();
// let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');
//
// let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");
//
//
// console.log("#################### running webPushDay Query");
// ShowNotification.find({oneSignalDay: false})
// .populate('user_id', '-password')
// .populate('show_ref')
// .then((notif_users)=>{
// if(!notif_users){
// 	console.log("No users");
// }else {
//
// notif_users.forEach((notif_user)=>{
// 	let remindersDate = [];
// 	notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{
//
//
// 		let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
// 		let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')
//
// 			if(showDate.isSame(todaysDate, 'day')){
//
// 				if(notif_user.user_id.os_id){
// 					console.log(notif_user.show_ref.tvShowName);
// 					let message = `${notif_user.show_ref.tvShowName} S${user_notif_episodes.season}E${user_notif_episodes.number} will be released today!`
// 					push.sendWebPush([notif_user.user_id.os_id], message, function(err, response){
// 						if(response){
// 							ShowNotification.update({_id: notif_user._id, tvShowId: notif_user.show_ref.tvShowId}, {oneSignalDay: true})
// 							.then((msg)=>{
// 								console.log(msg);
// 							})
// 						}
// 					})
//
//
// 				}
//
// 			}
//
// 	})
//
//
// })
// }
//
// });
//
// }

// function webPushHour(){
//
// console.log("webPushHour");
// let d = new Date();
// let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');
//
// let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");
//
//
// console.log("#################### running webPushHour Query");
// ShowNotification.find({oneSignalHour: false})
// .populate('user_id', '-password')
// .populate('show_ref')
// .then((notif_users)=>{
// if(!notif_users){
// 	console.log("No users");
// }else {
//
// notif_users.forEach((notif_user)=>{
// 	let remindersDate = [];
// 	notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{
//
//
// 		let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
// 		let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')
//
// 			if(showDate.isSame(todaysDate, 'day')){
//
// 				if(showDateTime.diff(todayAll) <= 3600000){
// 					if(notif_user.user_id.os_id){
// 						console.log(notif_user.show_ref.tvShowName);
// 						let message = `${notif_user.show_ref.tvShowName} S${user_notif_episodes.season}E${user_notif_episodes.number} will be released today!`
// 						push.sendWebPush([notif_user.user_id.os_id], message, function(err, response){
// 							if(response){
// 								ShowNotification.update({_id: notif_user._id, tvShowId: notif_user.show_ref.tvShowId}, {oneSignalHour: true})
// 								.then((msg)=>{
// 									console.log(msg);
//
// 									let body = {
// 										user_id: notif_user._id,
// 										tvShowId: notif_user.show_ref.tvShowId,
// 										timeRun: showDate.add(1, 'day').toDate()
// 									}
// 									NotifReset.create(body)
//
// 								})
// 							}
// 						})
// 					}
// 			}
//
//
//
// 			}
//
// 	})
//
//
// })
// }
//
// });
//
// }



// function notifQueryDate(){
// 	console.log("notifQueryDate");
// 	let d = new Date();
// 	let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');
// 	console.log(todaysDate, typeof todaysDate);
//
// 	let todayAll = moment(d).tz('Asia/Calcutta').format("MMMM Do YYYY, h:mm");
// 	console.log(todayAll);
//
//
// console.log("#################### running Date Query");
// ShowNotification.find({emailDay: false})
// .populate('user_id', '-password')
// .populate('show_ref')
// .then((notif_users)=>{
//   if(!notif_users){
//     console.log("No users");
//   }else {
//   notif_users.forEach((notif_user)=>{
// 		let remindersDate = [];
//     notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{
//
// 			let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
// 			let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')
//
// 				if(showDate.isSame(todaysDate, 'day')){
// 					mailerDate(notif_user, user_notif_episodes)
//
// 				}
//
//     })
//
//
//   })
//   }
//
// });
// }

function notifQueryHour(){
	console.log("####################Runin Notif Query Hours");
	let d = new Date();
	let todaysDate = moment(d, 'YYYY.MM.DD').tz('Asia/Calcutta');
	console.log(todaysDate, typeof todaysDate);


	let todayAll = moment(d).tz('Asia/Calcutta');
	console.log(todayAll);

	ShowNotification.find({emailHour: false})
	.populate('user_id', '-password')
	.populate('show_ref')
	.then((notif_users)=>{
	  if(!notif_users){
	    console.log("No users");
	  }else {
	  notif_users.forEach((notif_user)=>{
	    notif_user.show_ref.episodes.forEach((user_notif_episodes)=>{

				let showDate = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD').tz('Asia/Calcutta');
				let showDateTime = moment(user_notif_episodes.airstamp, 'YYYY.MM.DD, h:mm').tz('Asia/Calcutta')

				showDateTime = (showDateTime.add(1, 'hour'));

					if(showDate.isSame(todaysDate, 'day')){

						console.log("Current time: ", todayAll.format('YYYY.MM.DD, h:mm'));
						console.log("showTime: ", showDateTime.format('YYYY.MM.DD, h:mm'));
							if(showDateTime.diff(todayAll) <= 3600000){
							mailerHour(notif_user, user_notif_episodes, showDate.add(1, 'day').toDate());
						}

					}

	    })


	  })
	  }

	});

}


// function mailerDate(notif_user, episodes){
// console.log("Notif Sent!");
//
//
// ShowNotification.update({_id: notif_user._id, tvShowId: notif_user.show_ref.tvShowId}, {oneDay: true})
// .then((msg)=>{
// 	console.log(msg);
// })
//
// let mailer = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: 'nitish@creativeappography.com',
// 		pass: 'nitish@123'
// 	}
// });
//
// mailer.use('compile', hbs({
// 	viewPath: './templates',
// 	extName: '.hbs'
// }))
//
// let mailOptions = {
//  from: 'nitish@creativeappography.com',
//  to: `${notif_user.user_id.email}`,
//  subject: `Notification fron Binged.xyz ${notif_user.show_ref.tvShowName} S${episodes.season}E${episodes.number}`,
//  template: 'show_notif_mail',
//  context: {
// poster_img : notif_user.show_ref.tvShowImageUrl,
// show_name : notif_user.show_ref.tvShowName,
// episode_season : episodes.season,
// episode_number : episodes.number,
// episode_name : episodes.name,
// episode_airdate : episodes.airdate,
// episode_airtime : episodes.airtime,
// message: "Show will be released in One Day!"
//  }
// };
//
// mailer.sendMail(mailOptions, (err, done)=>{
// 		if(err){
// 			console.log(err);
// 			return
// 		}else {
// 			console.log("Sent mail to: ", done);
// 		}
// })


// var transporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
// 	 user: 'nitish@creativeappography.com',
// 	 pass: 'nitish@123'
//     }
// });
//
// const mailOptions = {
//   from: 'sender@email.com', // sender address
//   to: `${notif_user.user_id.email}`, // list of receivers
//   subject: 'Notification fron Binged.xyz!', // Subject line
// 	text: `${notif_user.show_ref.tvShowName}`,
//   html: `<p>${notif_user.show_ref.tvShowName} S${episodes.season}E${episodes.number} will be released today! Don't miss it!</p>`// plain text body
// };
//
// transporter.sendMail(mailOptions, function (err, info) {
//    if(err)
//      console.log("err: ",  err);
//    else
//      console.log("Mail Sent: ", info);
// });

// }

function mailerHour(notif_user, episodes, resetDate){
console.log("notif hour sent!");
console.log(notif_user.user_id._id, notif_user.show_ref.tvShowId);
ShowNotification.update({user_id: notif_user.user_id._id, tvShowId: notif_user.show_ref.tvShowId}, {emailHour: true})
.then((msg)=>{
	console.log(msg);

	let body = {
		user_id: notif_user.user_id._id,
    tvShowId: notif_user.show_ref.tvShowId,
    timeRun: resetDate
	}
	NotifReset.create(body)
	.then((done)=>{
		console.log("DONEEEE: ", done);
	})
})

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
 to: `${notif_user.user_id.email}`,
 subject: `Binged! ${notif_user.show_ref.tvShowName} S${episodes.season}E${episodes.number}`,
 template: 'show_notif_mail',
 context: {
poster_img : notif_user.show_ref.tvShowImageUrl,
show_name : notif_user.show_ref.tvShowName,
episode_season : episodes.season,
episode_number : episodes.number,
episode_name : episodes.name,
episode_airdate : episodes.airdate,
episode_airtime : episodes.airtime,
message: "Show will be released in One Hour!"
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

//
// var transporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//         user: 'nitish@creativeappography.com',
//         pass: 'nitish@123'
//     }
// });
//
// const mailOptions = {
//   from: 'sender@email.com', // sender address
//   to: `${notif_user.user_id.email}`, // list of receivers
//   subject: 'Notification fron Binged.xyz!', // Subject line
// 	text: `${notif_user.show_ref.tvShowName}`,
//   html:`<p>${notif_user.show_ref.tvShowName} S${episodes.season}E${episodes.number} will be releasing in 1 hour! You don't wanna miss it, do you?!</p>`// plain text body
// };
//
// transporter.sendMail(mailOptions, function (err, info) {
//    if(err)
//      console.log(err)
//    else
//      console.log(info);
// });

}
