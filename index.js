const app = require('./app')
const TripModel = require('./model/trip_model')

const port = 4000;

app.get('/',(req,res)=>{
    res.send("Welcome to B4VDIE Backend");
}); 

app.listen(port,()=>{
    console.log(`Server Listening on port:${port}`)
});