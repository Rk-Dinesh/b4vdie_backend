const express = require('express');
const cotravellerrouter = require('express').Router();

const cotravellerController = require('../controller/cotraveller_controller');

cotravellerrouter.post('/createtraveller', cotravellerController.Cotraveller);
cotravellerrouter.get('/gettraveller', cotravellerController.get);
cotravellerrouter.put('/updatetraveller', cotravellerController.Update);
cotravellerrouter.delete('/deletetraveller', cotravellerController.delete);
cotravellerrouter.delete('/deletealltraveller', cotravellerController.deletetraveller);

module.exports = cotravellerrouter;