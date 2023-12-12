const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const CotravellerSchema = new Schema({
    travellerid: {
        type: String,
        required: true
    },
    tripid: {
        type: String,
        required: true
    },
    cotraveller_name: {
        type: String,
        required: true
    },
    cotraveller_userid: {
        type: String,
        required: true
    },
   
    join_location: {
        type: String,
        required: true
    }
});

const CoTravellerModel = db.model('cotraveller', CotravellerSchema);
module.exports = CoTravellerModel;