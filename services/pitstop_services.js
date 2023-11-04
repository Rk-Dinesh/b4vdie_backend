const PitstopModel = require('../model/pitstop_model');

class PitstopService{

    static async createPitstop(tripid,pitstop_name,pitstop_location){
        try {
           const createPits = new PitstopModel({tripid, pitstop_name : pitstop_name, pitstop_location : pitstop_location});
           return await createPits.save();
        } catch (error) {
            throw error;
        }
    }

    static async updatepitstop(tripid,pitstop_name,pitstop_location){
        try {
            var query = {tripid : tripid};
            var values = {$set : {pitstop_name : pitstop_name,pitstop_location : pitstop_location}};
            
            return await PitstopModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deletepitstop(tripid){
        try{
            var query = {tripid : tripid};
            return await PitstopModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getpitstop(tripid){
        try {
            var query = {tripid : tripid};
            return await PitstopModel.find(query)
        } catch (error) {
            throw error
        }
    }
}
module.exports = PitstopService;