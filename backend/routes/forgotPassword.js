const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const rp = require('request-promise');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
var randomstring = require("randomstring");

// bring in models
let User = require('../models/user');

let mailer = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'nitish@creativeappography.com',
		pass: 'nitish@123'
	}
});

mailer.use('compile', hbs({
	viewPath: 'templates',
	extName: '.hbs'
}))

router.post('/', function(req, res){
    var randomPassword = randomstring.generate(6);
    console.log(randomPassword);
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(randomPassword, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            req.body.password = hash;
        });
    });
    User.findOne({'email': req.body.email})
    .then((user)=>{
        if(!user){
            res.send({
                success:false,
                msg:"email not found",
            })
        }else{
            User.update({_id: user._id}, req.body, function(err, raw) {
                let mailOptions = {
                    from: 'nitish@creativeappography.com',
                    to: `${req.body.email}`,
                    subject: `Notification fron Binged.xyz`,
                    template: 'forgot_password',
                    context: {
                    newPassword: randomPassword,
                    message: "Your passwword has been changed."
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

                res.send({
                    success:true,
                    msg:"password changed",
                })
            })
        }
    })

})


module.exports = router;
