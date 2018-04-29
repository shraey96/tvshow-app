let mongoose = require('mongoose');

//user schema

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    google_id:{
      type: String,
      require:false
    },
    google_token:{
      type: String,
      require:false
    },
    profile_Img:{
        type:String,
        require:false
    },
    os_id:{
      type:String,
      require: false
    },
    oneSignalNotif:{
      type: Boolean,
      default: true,
    },
    emailNotif:{
      type: Boolean,
      default: true
    },
    country:{
        type:String,
        require:false
    },
    created_At:{
        type:Date,
        default:Date.now()
    }

});

const User = module.exports = mongoose.model('User', UserSchema);
