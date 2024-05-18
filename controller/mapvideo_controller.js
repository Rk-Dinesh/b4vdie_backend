const path = require('path');
const fs = require('fs');
const MapVideoServices = require('../services/mapvideo_service');




exports.register = async (req, res, next) => {
    try {
        const { tripid, tripname, lon, lat } = req.body;
        const { filename } = req.file; 

        const response = await MapVideoServices.mapVideo(tripid, tripname, filename, lon, lat);
      
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


exports.Update = async (req,res, next) => {
    try {
        const { marker_idv,lon,lat} = req.body;
        const updateData = await MapVideoServices.update(marker_idv,lon,lat);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }
}

exports.updateVideo = async (req, res, next) => {
    try {
        const { marker_idv } = req.query;
        const { filename } = req.file;

        const { updatevideo, oldImage } = await MapVideoServices.updatevideo(
            marker_idv,
            filename,
        );

        const data = {
            marker_idv,
            video: filename,
        };

        if (oldImage) {
            const oldImagePath = path.join(__dirname, '../mapvideo', oldImage);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Error deleting old image file: ${err.message}`);
                }
            });
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};


exports.delete = async(req, res, next)=>{
    try{
        const{marker_idv} = req.query;
        const map = await MapVideoServices.delete(marker_idv);

        if (map && map.video) {
            const filePath = path.join(__dirname, '../mapvideo', map.video);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err.message}`);
                }
            });
        }

        res.status(200).json(map)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const map = await MapVideoServices.get();
        res.status(200).json({token : map})
    } catch (error) {
        next(error);
    }
}

exports.getMarkerIdv = async(req,res,next) => {
    try {
        const {marker_idv} = req.query;
        const map = await MapVideoServices.getMarkerIdV(marker_idv);
        res.status(200).json(map)
    } catch (error) {
        next(error);
    }
}

