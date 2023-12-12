const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const TripimageSchema = new Schema({
    tripid : {
        type : String,
        required : true,
    },
    img_name : {
        type : String,
        required : true,
    }
});

const TripimageModel = db.model('tripimage', TripimageSchema);

module.exports = TripimageModel;