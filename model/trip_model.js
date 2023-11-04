const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const TripSchema = new Schema ({
    userid : {
        type : String,
        required : true
    },
    fname : {
        type : String,
        required : true
    },
    tripid : {
        type : String,
        required : true,
    },
    tripname : {
        type : String,
        required : true,
    },
    start_date : {
        type : String,
        required : true
    },
    end_date : {
        type : String,
        required : true
    },
    start_point : {
        type : String,
        required : true
    },
    end_point : {
        type : String,
        required : true
    }
});

const TripModel = db.model('trip',TripSchema);

module.exports = TripModel;
