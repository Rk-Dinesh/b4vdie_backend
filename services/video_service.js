const VideoModel = require("../model/video_model");
const IdcodeServices = require("./idcode_services");


class VideoServices {
   

    static async Video(tripid, tripname, video) {
        try {
            const video_id = await IdcodeServices.generateCode("Video");
            const create = new VideoModel({ video_id, tripid, tripname, video });
            return await create.save();
        } catch (err) {
            throw err;
        }
    }

    static async updatevideo(video_id, video) {
        try {
            const vid = await VideoModel.findOne({ video_id });
            if (!vid) {
                throw new Error("video not found");
            }
            const oldVideo = vid.video;
            const updatevideo = await VideoModel.findOneAndUpdate(
                { video_id },
                { $set: { video } },
                { new: true }
            );
            return { updatevideo, oldVideo };
        } catch (error) {
            throw error;
        }
    }

    
    static async delete(video_id) {
        try {
            var query = { video_id: video_id };
            return await VideoModel.findOneAndDelete(query);

        } catch (error) {
            throw error;
        }
    }

    static async get() {
        try {

            return await VideoModel.find()
        } catch (error) {
            throw error
        }
    }

    

    static async getVideoId(video_id) {
        try {
            return await VideoModel.findOne({ video_id })
        } catch (error) {
            throw error
        }
    }

    

}
module.exports = VideoServices;