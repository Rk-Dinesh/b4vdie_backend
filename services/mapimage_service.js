const MapImageModel = require("../model/mapimage_model");
const IdcodeServices = require("./idcode_services");


class MapImageServices {
   

    static async mapImage(tripid, tripname, img, lon, lat) {
        try {
            const marker_id = await IdcodeServices.generateCode("MapImg");
            const create = new MapImageModel({ marker_id, tripid, tripname, img, lon, lat });
            return await create.save();
        } catch (err) {
            throw err;
        }
    }
    static async update(marker_id,lon,lat) {
        try {
            var query = { marker_id: marker_id };
            var values = { $set: { lon:lon,lat:lat} };

            return await MapImageModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async updateImages(marker_id, img) {
        try {
            const map = await MapImageModel.findOne({ marker_id });
            if (!map) {
                throw new Error("user not found");
            }
            const oldImage = map.img;
            const updateimage = await MapImageModel.findOneAndUpdate(
                { marker_id },
                { $set: { img } },
                { new: true }
            );
            return { updateimage, oldImage };
        } catch (error) {
            throw error;
        }
    }

    

   
    
    static async delete(marker_id) {
        try {
            var query = { marker_id: marker_id };
            return await MapImageModel.findOneAndDelete(query);

        } catch (error) {
            throw error;
        }
    }

    static async get() {
        try {

            return await MapImageModel.find()
        } catch (error) {
            throw error
        }
    }

    

    static async getMarkerId(tripid) {
        try {
            return await MapImageModel.find({ tripid })
        } catch (error) {
            throw error
        }
    }

    

}
module.exports = MapImageServices;