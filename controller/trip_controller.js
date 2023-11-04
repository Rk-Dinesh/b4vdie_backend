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

exports.update = async (req,res,next) => {
    try {
        const{userid,fname,tripid,tripname,start_date,end_date,start_point,end_point} = req.body;

        const updateData = await TripServices.updateTrip(userid,fname,tripid,tripname,start_date,end_date,start_point,end_point);
        res.status(200).json(updateData)

    } catch (error) {
        next (error)
    }
}

exports.delete = async (req,res,next) => {
    try {
        const {userid} = req.body;
        const deleteData = await TripServices.deleteTrip(userid);
        res.status(200).json(deleteData)
    } catch (error) {
        next(error)
    }
}

exports.get = async (req,res,next) => {
    try {
        const {userid} = req.body;
        const getData = await TripServices.getTrip(userid);
        res.status(200).json(getData)
    } catch (error) {
        next(error);
    }
}