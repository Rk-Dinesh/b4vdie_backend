const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://3.26.156.157:27017').on('open',()=>{
    console.log("Mongo DB Connected");
}).on('error',()=>{
    console.log("Mongo DB Connection Error")
});
module.exports = connection;