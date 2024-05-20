const express = require('express');
const videorouter = require('express').Router();
const multer = require('multer');
const path = require("path");
const fs = require('fs')

const VideoController = require('../controller/video_controller')

const storage = multer.diskStorage({
    destination: 'video',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const deleteFileOnError = (err, req, res, next) => {
    if (req.file && req.file.path) {
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error(`Error deleting file: ${unlinkErr.message}`);
            }
        });
    }
    next(err);
};



const video = multer({ storage: storage }).single('video');

videorouter.post('/video',video, VideoController.register);
videorouter.delete('/deletevideo', VideoController.delete);
videorouter.put('/updatevideo', video,VideoController.updateVideo);
videorouter.get('/getmapvId', VideoController.getVideoId);
videorouter.get('/getallvideo', VideoController.get);


videorouter.use(deleteFileOnError);

module.exports = videorouter;