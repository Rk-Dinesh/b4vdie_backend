const express = require(`express`);
const cors = require('cors')
const body_parser = require('body-parser');
const Router = require('./routers/router');

const app = express();
app.use(cors());
app.use(express.static("img"))
app.use(body_parser.json());
app.use('/',Router);


module.exports =app;