let mongoose = require('mongoose');

//showNotification schema

const showNotification = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    tvShowId: {
        type: Number,
        require: true
    },
    tvShowRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"showCache",
        require:true
    },
    Sent:{
        type: Boolean,
        default: false
    },
    oneHour:{
        type: Boolean,
        default: false
    },
    oneDay:{
        type: Boolean,
        dafault: false
    }

});

const ShowNotification = module.exports = mongoose.model('ShowNotification', showNotification);
