const config = require('./config/onesignal');
const oneSignal = require('onesignal')(config.REST_KEY, config.APP_ID, true);

exports.sendWebPush = function(pid, message, cb){

  let url = "http://localhost:3000/#/calendar/"

  oneSignal.createNotification(message, {}, pid, url)
  .then((result)=>{
    cb(null, result)
    console.log("result: ", result);
  })
  .catch((err)=>{
    cb(err)
    console.log(err);
  })
}
