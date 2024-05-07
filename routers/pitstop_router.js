const express = require('express');
const pitstoprouter = require('express').Router();

const pitstopController = require('../controller/pitstop_controller');

pitstoprouter.post('/createpitstop', pitstopController.pitstop);
pitstoprouter.get('/getpitstop', pitstopController.get);
pitstoprouter.put('/updatepitstop', pitstopController.Update);
pitstoprouter.delete('/deletepitstop', pitstopController.delete);
pitstoprouter.delete('/deleteallpitstop', pitstopController.deletepitstop);

module.exports = pitstoprouter;