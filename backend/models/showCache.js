let mongoose = require('mongoose');

//user schema

const showCache = mongoose.Schema({
    tvShowId: {
        type: Number,
        require: true
    },
    tvShowIMDB: {
        type: Number,
        require: false
    },
    tvShowImageUrl:{
        type: String,
        require:false
    },
    tvShowName: {
         type: String,
         require: false
    },
    totalEpisodeCount:{
        type: Number,
        require:true
    },
    episodes:{
        type: Array,
        require:true
    },
    last_updated:{
        type:Date,
        default:Date.now()
    }

});

const showDetails = module.exports = mongoose.model('showCache', showCache);
