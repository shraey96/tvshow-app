let mongoose = require('mongoose');

//Feedback schema

const FeedbackSchema = mongoose.Schema({
    name:{
        type:String,
        require:false
    },
    feedback:{
        type:String,
        require:false
    },
    created_At:{
        type:Date,
        default:Date.now()
    }

});

const Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);
