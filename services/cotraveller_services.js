const CotravellerModel = require('../model/cotraveller_model');
const idcode_services = require('./idcode_services');

class CotravellerService{
    static async createCotraveller(tripid,travellerid,cotraveller_userid,cotraveller_name,join_location){
        try {
            var travellerid = await idcode_services.generateCode('travellerId');
            const addCotraveller = new CotravellerModel({tripid,travellerid,cotraveller_userid : cotraveller_userid,cotraveller_name: cotraveller_name,join_location :join_location});
            return await addCotraveller.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateCotraveller(tripid,travellerid,cotraveller_userid,cotraveller_name,join_location){
        try {
            var query = {travellerid : travellerid};
            var values = {$set : {tripid,cotraveller_userid : cotraveller_userid,cotraveller_name : cotraveller_name, join_location : join_location}};
            
            return await CotravellerModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteCotraveller(travellerid){
        try{
            var query = {travellerid : travellerid};
            return await CotravellerModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async delete(tripid){
        try{
            var query = {tripid : tripid};
            return await CotravellerModel.deleteMany(query);

        }catch(error){
            throw error;
        }
    }

    static async getCotraveller(tripid){
        try {
            
            return await CotravellerModel.find({tripid})
        } catch (error) {
            throw error
        }
    }
}
module.exports = CotravellerService;