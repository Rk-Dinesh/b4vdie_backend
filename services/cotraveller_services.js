const CotravellerModel = require('../model/cotraveller_model');

class CotravellerService{
    static async createCotraveller(tripid,cotraveller_userid,cotraveller_name,join_location){
        try {
            const addCotraveller = new CotravellerModel({tripid,cotraveller_userid: cotraveller_userid,cotraveller_name: cotraveller_name,join_location :join_location});
            return await addCotraveller.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateCotraveller(tripid,cotraveller_userid,cotraveller_name,join_location){
        try {
            var query = {tripid : tripid};
            var values = {$set : {cotraveller_name : cotraveller_name,cotraveller_userid : cotraveller_userid, join_location : join_location}};
            
            return await CotravellerModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteCotraveller(tripid){
        try{
            var query = {tripid : tripid};
            return await CotravellerModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getCotraveller(tripid){
        try {
            var query = {tripid : tripid};
            return await CotravellerModel.find(query)
        } catch (error) {
            throw error
        }
    }
}
module.exports = CotravellerService;