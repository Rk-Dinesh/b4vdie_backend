const TripModel = require('../model/trip_model');
const { updateOne, findOneAndDelete } = require('../model/user_model');
const idcode_services = require('./idcode_services');


class TripServices {

    static async createTrip(userid,fname,tripname,start_date,end_date,start_point,end_point){
        try {
            var tripid = await idcode_services.generateCode('TripId');
            const newtrip = new TripModel({userid,fname,tripid,tripname,start_date,end_date,start_point,end_point});
            return await newtrip.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateTrip(userid,fname,tripid,tripname,start_date,end_date,start_point,end_point){

        const query = {userid : userid};
        const values = {$set : {fname : fname,tripid, tripname : tripname, start_date : start_date,end_date : end_date, start_point :start_point,end_point : end_point}}

        return await TripModel.updateOne(query,values)
    }

    static async deleteTrip(userid){
        const query = {userid : userid};
        return await TripModel.findOneAndDelete(query)
    }

    static async getTrip(userid){
        const query = {userid : userid};
        return await TripModel.find(query);
    }
};

   



module.exports = TripServices;
