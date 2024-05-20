const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const VideoSchema = new Schema({
    video_id: {
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
    }
});

const VideoModel = db.model('video',VideoSchema);

module.exports = VideoModel;