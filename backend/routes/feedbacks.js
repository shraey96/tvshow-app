const express = require('express');
const router = express.Router();

let Feedback = require('../models/feedback');

router.post('/', function(req, res){
    Feedback.create(req.body)
        .then((newFeedback)=>{
            res.json({
                success:true,
                msg:"Feedback Added.",
            });
    });
});

module.exports = router;
