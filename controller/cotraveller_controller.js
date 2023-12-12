const CotravellerService = require('../services/cotraveller_services');

exports.Cotraveller = async(req,res,next)=>{
    try {
        const{tripid,travellerid,cotraveller_userid,cotraveller_name,join_location} = req.body;
        const successRes = await CotravellerService.createCotraveller(tripid,travellerid,cotraveller_userid,cotraveller_name,join_location);
        let data = {tripid,travellerid, cotraveller_userid : cotraveller_userid, cotraveller_name : cotraveller_name, join_location : join_location}
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}

exports.Update = async (req,res, next) => {
    try {
        const{tripid,travellerid,cotraveller_userid,cotraveller_name,join_location} = req.body;
        const updateData = await CotravellerService.updateCotraveller(tripid,travellerid,cotraveller_userid,cotraveller_name,join_location);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{travellerid} = req.query;
        const deleteData = await CotravellerService.deleteCotraveller(travellerid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.deletetraveller = async(req, res, next)=>{
    try{
        const{tripid} = req.query;
        const deleteData = await CotravellerService.delete(tripid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {tripid} = req.query;
        const getData = await CotravellerService.getCotraveller(tripid);
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}