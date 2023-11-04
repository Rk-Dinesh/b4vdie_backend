const TripAlertModel = require('../model/tripalert_model');

class TripAlertService{
    static async createTripAlert(tripid,alerttype,interval){
        try {
            const newTripAlert = new TripAlertModel({tripid,alerttype:alerttype, interval:interval});
            return await newTripAlert.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateTripAlert(tripid,alerttype,interval){
        try {
            var query = {tripid : tripid};
            var values = {$set : {alerttype : alerttype, interval : interval}};
            
            return await TripAlertModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteTripAlert(tripid){
        try{
            var query = {tripid : tripid};
            return await TripAlertModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getTripAlert(tripid){
        try {
            var query = {tripid : tripid};
            return await TripAlertModel.find(query)
        } catch (error) {
            throw error
        }
    }
}
module.exports = TripAlertService;
