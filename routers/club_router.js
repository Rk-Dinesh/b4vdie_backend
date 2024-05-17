const express = require('express');
const clubrouter = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ClubController = require('../controller/club_controller');

const storage = multer.diskStorage({
    destination: 'club',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const deleteFilesOnError = (err, req, res, next) => {
    if (req.files) {
        const files = [];
        if (req.files.clubimage) {
            files.push(req.files.clubimage[0].path);
        }
        if (req.files.clubcover) {
            files.push(req.files.clubcover[0].path);
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


const club = multer({ storage: storage }).fields([
    { name: 'clubimage', maxCount: 1 },
    { name: 'clubcover', maxCount: 1 },
]);

clubrouter.post('/uploadclub', club, ClubController.createClub);
clubrouter.put('/updateimage', club, ClubController.updateImage);
clubrouter.put('/updatecover', club, ClubController.updatecover);
clubrouter.put('/updatename', club, ClubController.update);
clubrouter.delete('/deleteclub', ClubController.delete);
clubrouter.get('/getclubId', ClubController.get);
clubrouter.get('/getclub', ClubController.getclub);
clubrouter.post('/clubfollow/:followedClubId',ClubController.follow);
clubrouter.post('/clubunfollow/:followedClubId',ClubController.unfollow)

clubrouter.use(deleteFilesOnError);

module.exports = clubrouter;