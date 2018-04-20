let mongoose = require('mongoose');

//user schema

const showAutoComplete = mongoose.Schema({
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
    tvShowStatus: {
          type: String,
    },
    tvShowGenres: {
          type: Array
    },
    tvShowPremiered: {
          type: Date
    },
    tvShowLanguage: {
          type: String
    },
    tvShowRating: {
          type: Number
    }

});

const showAuto = module.exports = mongoose.model('showAutoComplete', showAutoComplete);
