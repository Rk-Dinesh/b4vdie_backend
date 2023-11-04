const mongoose= require('mongoose');
const db= require('../config/db');

const { Schema } = mongoose;

const TripAlertSchema = new Schema({

tripid:{
    type: String,
    required: true
},
alerttype:{
    type: String,
    required:true
},
interval:{
    type: String,
    required: true
}
});

const TripAlertModel= db.model('tripalert',TripAlertSchema);

module.exports= TripAlertModel;