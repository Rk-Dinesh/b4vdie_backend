const MapVideoModel = require("../model/mapvideo_model");
const IdcodeServices = require("./idcode_services");


class MapVideoServices {
   

    static async mapVideo(tripid, tripname, video, lon, lat) {
        try {
            const marker_idv = await IdcodeServices.generateCode("MapVid");
            const create = new MapVideoModel({ marker_idv, tripid, tripname, video, lon, lat });
            return await create.save();
        } catch (err) {
            throw err;
        }
    }
    static async update(marker_idv,lon,lat) {
        try {
            var query = { marker_idv: marker_idv };
            var values = { $set: { lon:lon,lat:lat} };

            return await MapVideoModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async updatevideo(marker_idv, video) {
        try {
            const map = await MapVideoModel.findOne({ marker_idv });
            if (!map) {
                throw new Error("user not found");
            }
            const oldImage = map.video;
            const updatevideo = await MapVideoModel.findOneAndUpdate(
                { marker_idv },
                { $set: { video } },
                { new: true }
            );
            return { updatevideo, oldImage };
        } catch (error) {
            throw error;
        }
    }

    

   
    
    static async delete(marker_idv) {
        try {
            var query = { marker_idv: marker_idv };
            return await MapVideoModel.findOneAndDelete(query);

        } catch (error) {
            throw error;
        }
    }

    static async get() {
        try {

            return await MapVideoModel.find()
        } catch (error) {
            throw error
        }
    }

    

    static async getMarkerIdV(marker_idv) {
        try {
            return await MapVideoModel.findOne({ marker_idv })
        } catch (error) {
            throw error
        }
    }

    

}
module.exports = MapVideoServices;