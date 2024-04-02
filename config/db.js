const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://52.64.11.96:27017/b4vdie_db').on('open',()=>{
    console.log("Mongo DB Connected");
}).on('error',()=>{
    console.log("Mongo DB Connection Error")
});
module.exports = connection;