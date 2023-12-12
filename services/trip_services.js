const TripModel = require('../model/trip_model');
const { updateOne, findOneAndDelete } = require('../model/user_model');
const idcode_services = require('./idcode_services');


class TripServices {

    static async createTrip(userid,fname,tripname,start_date,end_date,start_point,end_point,status,orgin_lat,orgin_lon,des_lat,des_lon){
        try {
            var tripid = await idcode_services.generateCode('TripId');
            const newtrip = new TripModel({userid,fname,tripid,tripname,start_date,end_date,start_point,end_point,status,orgin_lat,orgin_lon,des_lat,des_lon});
            return await newtrip.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateTrip(userid,fname,tripid,tripname,start_date,end_date,start_point,end_point,status,orgin_lat,orgin_lon,des_lat,des_lon){

        const query = {tripid : tripid};
        const values = {$set : {fname : fname,userid,tripid, tripname : tripname, start_date : start_date,end_date : end_date, start_point :start_point,end_point : end_point,status :status,orgin_lat : orgin_lat,orgin_lon : orgin_lon,des_lat : des_lat,des_lon : des_lon}}

        return await TripModel.updateOne(query,values)
    }

    static async deleteTrip(tripid){
        const query = {tripid : tripid};
        return await TripModel.deleteOne(query)
    }

    static async getTrip(userid){
       
        return await TripModel.find({userid});
    }

    static async gettrip(){
        try {
            return await TripModel.find();
        } catch (error) {
            throw error
        }
    }
};

   



module.exports = TripServices;
