const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const MapVideoSchema = new Schema({
    marker_idv: {
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
    video : {
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

const MapVideoModel = db.model('mapvideo',MapVideoSchema);

module.exports = MapVideoModel;