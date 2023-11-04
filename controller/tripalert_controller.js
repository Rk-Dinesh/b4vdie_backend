const TripAlertService = require('../services/tripalert-service');

exports.TripAlerts = async(req,res,next)=>{
    try {
       const{tripid,alerttype,interval} = req.body; 

       const successRes = await TripAlertService.createTripAlert(tripid,alerttype,interval);
       let data = {tripid, alerttype: alerttype, interval : interval}
       res.status(200).json(data);

    } catch (error) {
        next (error);
    }
}

exports.Update = async (req,res, next) => {
    try {
        const{tripid,alerttype,interval} = req.body; 

        const updateData = await TripAlertService.updateTripAlert(tripid,alerttype,interval);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{tripid} = req.body;
        const deleteData = await TripAlertService.deleteTripAlert(tripid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {tripid} = req.body;
        const getData = await TripAlertService.getTripAlert(tripid);
        res.status(200).json(getData)
    } catch (error) {
        next(error);
    }
}