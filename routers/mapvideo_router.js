const express = require('express');
const mapvideorouter = require('express').Router();
const multer = require('multer');
const path = require("path");
const fs = require('fs')

const MapVideoController = require('../controller/mapvideo_controller')

const storage = multer.diskStorage({
    destination: 'mapvideo',
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



const mapvideo = multer({ storage: storage }).single('video');

mapvideorouter.post('/mapvideo',mapvideo, MapVideoController.register);
mapvideorouter.delete('/deletemapvideo', MapVideoController.delete);
mapvideorouter.put('/updatemapvid', mapvideo,MapVideoController.updateVideo);
mapvideorouter.put('/updatemapvf', MapVideoController.Update);
mapvideorouter.get('/getmapvId', MapVideoController.getMarkerIdv);
mapvideorouter.get('/getmapallvid', MapVideoController.get);


mapvideorouter.use(deleteFileOnError);

module.exports = mapvideorouter;