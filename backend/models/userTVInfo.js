let mongoose = require('mongoose');

//tvShowSchema schema

const tvShowSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
   tvShowInfo : [
       {
           tvShowId: {
               type: Number,
               require: true
           },
           show_ref: {
             type: mongoose.Schema.Types.ObjectId,
             ref:"showCache"
           },
           episodeWatched: {
               type: Array,
               require:false
           }
       }
   ]

});

const TvShow = module.exports = mongoose.model('TvShow', tvShowSchema);
