const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const PitstopSchema = new Schema({
    tripid : {
        type : String,
        required : true,
    },
    pitstop_name : {
        type : String,
        required : true,
    },
    pitstop_location : {
        type : String,
        required : true,
    }

});

const PitstopModel = db.model('pitstop', PitstopSchema);

module.exports = PitstopModel;