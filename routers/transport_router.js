const express = require('express');
const transportrouter = require('express').Router();

const transportController = require('../controller/transport_controller');

transportrouter.post('/createtransport', transportController.transport);
transportrouter.get('/gettransport', transportController.get);
transportrouter.put('/updatetransport', transportController.update);
transportrouter.delete('/deletetransport', transportController.delete);
transportrouter.delete('/deletealltransport', transportController.deletetransport);

module.exports = transportrouter;