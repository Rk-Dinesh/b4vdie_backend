const express = require('express');
const clubrouter = require('express').Router();
const multer = require('multer');
const path = require("path");

const ClubController = require('../controller/club_controller');

const storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

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

module.exports = clubrouter;