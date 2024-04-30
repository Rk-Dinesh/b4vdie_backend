const mongoose = require('mongoose');
const db = require('../config/db');

const {Schema} = mongoose;

const ChatSchema = new Schema({

    email : {
        type : String,
       
    },
    msg : {
        type : String,
       
    },
    sender: {
        type: String,
    },
    username : {
        type : String,
       
    },
    
});

const ChatModel = db.model('chat', ChatSchema);

module.exports =  ChatModel;