const TripModel = require('../model/trip_model');
const idcode_services = require('./idcode_services');
const user_controller = require('../controller/user_controller')

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

};

//static async updateTrip(tripname,start_date,end_date,start_point,end_point)

module.exports = TripServices;
