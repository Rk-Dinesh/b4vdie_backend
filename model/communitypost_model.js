const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const CommunitySchema = new Schema({

    userid : {
        type : String,
        required : true,
    },
    community_id : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true,
    },
    like : {
        type: [String],
        
    },
    image : {
        type : String,
        required : true,
    }
});

const CommunityModel = db.model('communitypost', CommunitySchema);

module.exports =  CommunityModel;