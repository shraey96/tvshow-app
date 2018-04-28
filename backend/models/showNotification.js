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
    show_ref:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"showCache",
        require:true
    },
    Sent:{
        type: Boolean,
        default: false
    },
    emailHour:{
        type: Boolean,
        default: false
    },
    emailDay:{
      type: Boolean,
      default: false
    },
    oneSignalHour:{
      type: Boolean,
      default: false
    },
    oneSignalDay:{
      type: Boolean,
      default: false
    }

});

const ShowNotification = module.exports = mongoose.model('ShowNotification', showNotification);
