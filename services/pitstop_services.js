const PitstopModel = require('../model/pitstop_model');
const idcode_services = require('./idcode_services');

class PitstopService{

    static async createPitstop(tripid,pitstopid,pitstop_name,pitstop_location){
        try {
            var pitstopid = await idcode_services.generateCode('PitstopId');
           const createPits = new PitstopModel({tripid,pitstopid, pitstop_name : pitstop_name, pitstop_location : pitstop_location});
           return await createPits.save();
        } catch (error) {
            throw error;
        }
    }

    static async updatepitstop(pitstopid,tripid,pitstop_name,pitstop_location){
        try {
            var query = {pitstopid : pitstopid};
            var values = {$set : { tripid,pitstop_name : pitstop_name,pitstop_location : pitstop_location}};
            
            return await PitstopModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deletepitstop(pitstopid){
        try{
            var query = {pitstopid : pitstopid};
            return await PitstopModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async delete(tripid){
        try{
            var query = {tripid : tripid};
            return await PitstopModel.deleteMany(query);

        }catch(error){
            throw error;
        }
    }

    static async getpitstop(tripid){
        try {
            
            return await PitstopModel.find({tripid})
        } catch (error) {
            throw error
        }
    }
}
module.exports = PitstopService;