const express = require('express');
const otprouter = require('express').Router();

const otpController = require('../controller/otp_controller');

otprouter.post('/otp',otpController.generateOTP);
otprouter.post('/verifyotp',otpController.verify);

module.exports = otprouter;