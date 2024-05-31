const path = require('path');
const fs = require('fs');
const VideoServices = require('../services/video_service');


exports.register = async (req, res, next) => {
    try {
        const { tripid, tripname } = req.body;
        const { filename } = req.file; 

        const response = await VideoServices.Video(tripid, tripname, filename);
      
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

exports.updateVideo = async (req, res, next) => {
    try {
        const { video_id } = req.query;
        const { filename } = req.file;

        const { updatevideo, oldVideo} = await VideoServices.updatevideo(
            video_id,
            filename,
        );

        const data = {
            video_id,
            video: filename,
        };

        if (oldVideo) {
            const oldVdieoPath = path.join(__dirname, '../video', oldVideo);
            fs.unlink(oldVdieoPath, (err) => {
                if (err) {
                    console.error(`Error deleting old video file: ${err.message}`);
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
        const{video_id} = req.query;
        const vid = await VideoServices.delete(video_id);

        if (vid && vid.video) {
            const filePath = path.join(__dirname, '../video', vid.video);
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
        const vid = await VideoServices.get();
        res.status(200).json({token : vid})
    } catch (error) {
        next(error);
    }
}

exports.getVideoId = async(req,res,next) => {
    try {
        const {video_id} = req.query;
        const vid = await VideoServices.getVideoId(video_id);
        res.status(200).json(vid)
    } catch (error) {
        next(error);
    }
}

exports.getVideoIdtrip= async(req,res,next) => {
    try {
        const {tripid} = req.query;
        const vid = await VideoServices.getVideoIdtrip(tripid);
        res.status(200).json(vid)
    } catch (error) {
        next(error);
    }
}

