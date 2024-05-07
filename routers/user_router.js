const express = require('express');
const userrouter = require('express').Router();
const multer = require('multer');
const path = require("path");

const userController = require('../controller/user_controller');

const storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const user = multer({ storage: storage }).fields([
    { name: 'userimage', maxCount: 1 },
    { name: 'coverimage', maxCount: 1 },
]);

userrouter.post('/registration',user, userController.register);
userrouter.post('/login', userController.login);
userrouter.get('/getuser', userController.get)
userrouter.get('/get', userController.getUser)
userrouter.get('/getUserId', userController.getUserId);
userrouter.put('/update', userController.Update);
userrouter.put('/updateimageuser', user,userController.updateImage );
userrouter.put('/updatecoveruser', user,userController.updatecover);
userrouter.post('/follow/:followedUserId',userController.follow)
userrouter.post('/unfollow/:followedUserId',userController.unfollow)
userrouter.post('/interest/:userid',userController.addInterest);
userrouter.delete('/delete', userController.delete);
userrouter.get('/followers/:loggedInUserId', userController.getfollowersDetails);
userrouter.get('/following/:loggedInUserId', userController.getfollowingDetails);

module.exports = userrouter;