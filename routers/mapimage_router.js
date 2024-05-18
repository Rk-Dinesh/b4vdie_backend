const express = require('express');
const mapimagerouter = require('express').Router();
const multer = require('multer');
const path = require("path");
const fs = require('fs')

const MapImageController = require('../controller/mapimage_controller')

const storage = multer.diskStorage({
    destination: 'mapimage',
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



const mapimage = multer({ storage: storage }).single('img');

mapimagerouter.post('/mapimage',mapimage, MapImageController.register);
mapimagerouter.delete('/deletemapimage', MapImageController.delete);
mapimagerouter.put('/updatemapimg', mapimage,MapImageController.updateImage);
mapimagerouter.put('/updatemapf', MapImageController.Update);
mapimagerouter.get('/getmapId', MapImageController.getMarkerId);
mapimagerouter.get('/getmapalimg', MapImageController.get);


mapimagerouter.use(deleteFileOnError);

module.exports = mapimagerouter;