let mongoose = require('mongoose');

//NotifReset schema

const NotifReset = mongoose.Schema({
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      require:true
    },
    tvShowId: {
      type: Number,
      require: true
    },
    timeRun:{
        type:String,
    }

});

const NotifResetS = module.exports = mongoose.model('NotifReset', NotifReset);
