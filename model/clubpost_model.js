const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const ClubpostSchema = new Schema({
    club_id : {
        type : String,
        required : true,
    },
    clubpost_id : {
        type : String,
        required :true,
    },
    userid  : {
        type: String,
        required : true,
    },
 
    like : {
        type: [String],
        
    },
    des:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required: true
    },
    report:{
        type: String
    },
    clubpostimage : {
        type : String,
        required : true,
    }
    
});

const ClubPostModel = db.model('clubpost', ClubpostSchema);

module.exports = ClubPostModel;