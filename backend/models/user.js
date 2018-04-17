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
    profile_Img:{
        type:String,
        require:false
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
