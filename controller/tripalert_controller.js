const TripAlertService = require('../services/tripalert-service');

exports.TripAlerts = async(req,res,next)=>{
    try {
       const{alertid,tripid,alerttype,interval} = req.body; 

       const successRes = await TripAlertService.createTripAlert(alertid,tripid,alerttype,interval);
       let data = {alertid,tripid, alerttype: alerttype, interval : interval}
       res.status(200).json(data);

    } catch (error) {
        next (error);
    }
}

exports.Update = async (req,res, next) => {
    try {
        const{alertid,tripid,alerttype,interval} = req.body; 

        const updateData = await TripAlertService.updateTripAlert(alertid,tripid,alerttype,interval);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{alertid} = req.query;
        const deleteData = await TripAlertService.deleteTripAlert(alertid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.deletealert = async(req, res, next)=>{
    try{
        const{tripid} = req.query;
        const deleteData = await TripAlertService.delete(tripid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {tripid} = req.query;
        const getData = await TripAlertService.getTripAlert(tripid);
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}