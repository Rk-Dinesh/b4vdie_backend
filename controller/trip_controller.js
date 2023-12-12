const TripServices = require('../services/trip_services');

exports.trip = async(req,res,next) => {
    try {
        const{userid,fname,tripid,tripname,start_date,end_date,start_point,end_point,status,orgin_lat,orgin_lon,des_lat,des_lon} = req.body;

        const Data = await TripServices.createTrip(userid,fname,tripname,start_date,end_date,start_point,end_point,status,orgin_lat,orgin_lon,des_lat,des_lon);

        let tripData = {userid:userid,fname : fname,tripid : Data.tripid,tripname: tripname,start_date : start_date, end_date : end_date, start_point : start_point,end_point : end_point,status : status,orgin_lat : orgin_lat,orgin_lon :orgin_lon,des_lat : des_lat,des_lon : des_lon};
       // res.status(200).json(tripData)
        res.status(200).json({token : [tripData]})

    } catch (error) {
        throw error;
    }

}

exports.update = async (req,res,next) => {
    try {
        const{userid,fname,tripid,tripname,start_date,end_date,start_point,end_point,status,orgin_lat,orgin_lon,des_lat,des_lon} = req.body;

        const updateData = await TripServices.updateTrip(userid,fname,tripid,tripname,start_date,end_date,start_point,end_point,status,orgin_lat,orgin_lon,des_lat,des_lon);
        res.status(200).json(updateData)

    } catch (error) {
        next (error)
    }
}

exports.delete = async (req,res,next) => {
    try {
        const {tripid} = req.query;
        const deleteData = await TripServices.deleteTrip(tripid);
        res.status(200).json(deleteData)
    } catch (error) {
        next(error)
    }
}

exports.get = async (req,res,next) => {
    try {
        const {userid} = req.query;
        const getData = await TripServices.getTrip(userid);
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}

exports.gettrip = async(req,res,next) =>{
    try {
        const Admin = await TripServices.gettrip();
        res.status(200).json(Admin)
    } catch (error) {
        
    }
}