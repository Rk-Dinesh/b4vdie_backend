const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const TransportSchema = new Schema({
    tripid : {
        type : String,
        require : true,
    },
    mode_of_transport: {
        type : String,
        require : true,
    },
    from : {
        type : String,
        require : true,
    },
    to : {
        type : String,
        require : true,
    }
});

const TransportModel = db.model('transport', TransportSchema);

module.exports = TransportModel;