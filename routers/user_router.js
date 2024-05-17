const express = require('express');
const userrouter = express.Router();
const multer = require('multer');
const path = require("path");
const fs = require('fs');

const userController = require('../controller/user_controller');

const storage = multer.diskStorage({
    destination: 'image',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const user = multer({ storage: storage }).fields([
    { name: 'userimage', maxCount: 1 },
    { name: 'coverimage', maxCount: 1 },
]);

const deleteFilesOnError = (err, req, res, next) => {
    if (req.files) {
        const files = [];
        if (req.files.userimage) {
            files.push(req.files.userimage[0].path);
        }
        if (req.files.coverimage) {
            files.push(req.files.coverimage[0].path);
        }
        files.forEach(file => {
            fs.unlink(file, (unlinkErr) => {
                if (unlinkErr) {
                    console.error(`Error deleting file: ${unlinkErr.message}`);
                }
            });
        });
    }
    res.status(500).json({ message: err.message });
};

userrouter.post('/registration', user, userController.register);
userrouter.post('/login', userController.login);
userrouter.get('/getuser', userController.get);
userrouter.get('/get', userController.getUser);
userrouter.get('/getUserId', userController.getUserId);
userrouter.put('/update', userController.Update);
userrouter.put('/updateimageuser', user, userController.updateImage);
userrouter.put('/updatecoveruser', user, userController.updatecover);
userrouter.post('/follow/:followedUserId', userController.follow);
userrouter.post('/unfollow/:followedUserId', userController.unfollow);
userrouter.post('/interest/:userid', userController.addInterest);
userrouter.delete('/delete', userController.delete);
userrouter.get('/followers/:loggedInUserId', userController.getfollowersDetails);
userrouter.get('/following/:loggedInUserId', userController.getfollowingDetails);


userrouter.use(deleteFilesOnError);

module.exports = userrouter;
