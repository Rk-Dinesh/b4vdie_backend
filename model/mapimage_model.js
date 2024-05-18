const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const MapImageSchema = new Schema({
    marker_id: {
        type: String,
        required: true
    },
    tripid : {
        type : String,
        required: true
    },
    tripname : {
        type : String,
        required: true
    },
    img : {
        type : String,
        required: true
    },
    lon: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
});

const MapImageModel = db.model('mapimage',MapImageSchema);

module.exports = MapImageModel;