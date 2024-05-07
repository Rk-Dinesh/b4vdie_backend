const express = require('express');
const tripalertrouter = require('express').Router();

const tripalertController = require('../controller/tripalert_controller');

tripalertrouter.post('/createalert', tripalertController.TripAlerts);
tripalertrouter.get('/getalert', tripalertController.get);
tripalertrouter.put('/updatealert', tripalertController.Update);
tripalertrouter.delete('/deletealert', tripalertController.delete);
tripalertrouter.delete('/deleteallalert', tripalertController.deletealert);

module.exports = tripalertrouter;