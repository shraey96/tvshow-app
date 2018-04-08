let mongoose = require('mongoose');

//user schema

const tvShowSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
   tvShowInfo : [
       {
           tvShowId: {
               type: String,
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
               require:false
           },
           episodeWatched:{
               type: Array,
               require:false
           }
       }
   ]

});

const TvShow = module.exports = mongoose.model('TvShow', tvShowSchema);
