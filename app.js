const express = require(`express`);
const body_parser = require('body-parser');
const Router = require('./routers/router');

const app = express();
app.use(body_parser.json());
app.use('/',Router);

module.exports =app;