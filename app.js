const express = require(`express`);
const cors = require('cors')
const body_parser = require('body-parser');
const Router = require('./routers/router');

const app = express();
app.use(cors({
    "Access-Control-Allow-Origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
}));
app.use(express.static("img"))
app.use(body_parser.json());
app.use('/',Router);


module.exports =app;