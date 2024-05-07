const express = require('express');
const triprouter = require('express').Router();

const tripController = require('../controller/trip_controller');

triprouter.post('/createtrip', tripController.trip);
triprouter.get('/gettrip', tripController.get);
triprouter.get('/trips', tripController.gettrip);
triprouter.put('/updatetrip', tripController.update);
triprouter.delete('/deletetrip', tripController.delete);

module.exports = triprouter;