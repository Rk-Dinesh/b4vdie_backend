const TripServices = require('../services/trip_services');

exports.trip = async(req,res,next) => {
    try {
        const{userid,fname,tripid,tripname,start_date,end_date,start_point,end_point} = req.body;
        const Data = await TripServices.createTrip(userid,fname,tripname,start_date,end_date,start_point,end_point);
        let tripData = {userid:userid,fname : fname,tripid,tripname: tripname,start_date : start_date, end_date : end_date, start_point : start_point,end_point : end_point};
        res.status(200).json(tripData)
    } catch (error) {
        throw error;
    }

}