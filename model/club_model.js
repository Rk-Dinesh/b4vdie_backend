const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const ClubSchema = new Schema({

    userid : {
        type : String,
        required : true,
    },
    club_id : {
        type : String,
        required : true,
    },
    clubname : {
        type : String,
        required : true,
    },
    clubdesc : {
        type : String,
        required : true,
    },
    clubimage : {
        type : String,
        required : true,
    }
});

const ClubModel = db.model('club', ClubSchema);

module.exports =  ClubModel;