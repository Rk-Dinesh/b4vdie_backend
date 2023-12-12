const TripAlertModel = require('../model/tripalert_model');
const idcode_services = require('./idcode_services');

class TripAlertService{
    static async createTripAlert(alertid,tripid,alerttype,interval){
        try {
            var alertid = await idcode_services.generateCode('AlertId');
            const newTripAlert = new TripAlertModel({alertid,tripid,alerttype:alerttype, interval:interval});
            return await newTripAlert.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateTripAlert(alertid,tripid,alerttype,interval){
        try {
            var query = {alertid : alertid};
            var values = {$set : {tripid,alerttype : alerttype, interval : interval}};
            
            return await TripAlertModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteTripAlert(alertid){
        try{
            var query = {alertid : alertid};
            return await TripAlertModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async delete(tripid){
        try{
            var query = {tripid : tripid};
            return await TripAlertModel.deleteMany(query);

        }catch(error){
            throw error;
        }
    }

    static async getTripAlert(tripid){
        try {
            
            return await TripAlertModel.find({tripid})
        } catch (error) {
            throw error
        }
    }
}
module.exports = TripAlertService;
