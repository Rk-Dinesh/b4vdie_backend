const path = require('path');
const fs = require('fs');
const MapImageServices = require('../services/mapimage_service');



exports.register = async (req, res, next) => {
    try {
        const { tripid, tripname, lon, lat } = req.body;
        const { filename } = req.file; 

        const response = await MapImageServices.mapImage(tripid, tripname, filename, lon, lat);
      
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


exports.Update = async (req,res, next) => {
    try {
        const { marker_id,lon,lat} = req.body;
        const updateData = await MapImageServices.update(marker_id,lon,lat);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }
}

exports.updateImage = async (req, res, next) => {
    try {
        const { marker_id } = req.query;
        const { filename } = req.file;

        const { updateimage, oldImage } = await MapImageServices.updateImages(
            marker_id,
            filename,
        );

        const data = {
            marker_id,
            img: filename,
        };

        if (oldImage) {
            const oldImagePath = path.join(__dirname, '../mapimage', oldImage);
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
        const{marker_id} = req.query;
        const map = await MapImageServices.delete(marker_id);

        if (map && map.img) {
            const filePath = path.join(__dirname, '../mapimage', map.img);
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
        const map = await MapImageServices.get();
        res.status(200).json({token : map})
    } catch (error) {
        next(error);
    }
}

exports.getMarkerId = async(req,res,next) => {
    try {
        const {marker_id} = req.query;
        const map = await MapImageServices.getMarkerId(marker_id);
        res.status(200).json(map)
    } catch (error) {
        next(error);
    }
}

