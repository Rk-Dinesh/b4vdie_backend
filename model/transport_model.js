const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const TransportSchema = new Schema({
    transportid : {
        type : String,
        require : true,
    },
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
    },
    orgin_lat : {
        type : String,
        require : true,
    },
    orgin_lon : {
        type : String,
        require : true,
    },
    des_lat : {
        type : String,
        require : true,
    },
    des_lon : {
        type : String,
        require : true,
    },
});

const TransportModel = db.model('transport', TransportSchema);

module.exports = TransportModel;