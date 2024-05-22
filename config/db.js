const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://b4vdieAdmin:admin@51.21.55.30:27017/b4vdie_db?directConnection=true').on('open',()=>{
    console.log("Mongo DB Connected");
}).on('error',()=>{
    console.log("Mongo DB Connection Error")
});
module.exports = connection;