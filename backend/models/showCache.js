let mongoose = require('mongoose');

//user schema

const showCache = mongoose.Schema({
    tvShowId: {
        type: Number,
        require: true
    },
    tvShowIMDB: {
        type: String,
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

    },
    episodes:{
        type: Array,

    }

});

const showDetails = module.exports = mongoose.model('showCache', showCache);
