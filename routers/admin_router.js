const express = require('express');
const adminrouter = require('express').Router();

const AdminController = require('../controller/admin_controller');

adminrouter.post('/admin', AdminController.register);
adminrouter.post('/adminlogin', AdminController.login);
adminrouter.post('/checkuser', AdminController.checkUser);
adminrouter.get('/getadmin', AdminController.get)
adminrouter.get('/getadmin1', AdminController.getAdmin);
adminrouter.get('/getemail', AdminController.getEmail);
adminrouter.put('/updateadmin', AdminController.Update);
adminrouter.delete('/deleteadmin', AdminController.delete);
adminrouter.put('/updatePassword/:email', AdminController.UpdatePassword);

module.exports = adminrouter;