const CotravellerService = require('../services/cotraveller_services');

exports.Cotraveller = async(req,res,next)=>{
    try {
        const{tripid,cotraveller_name,cotraveller_userid,join_location} = req.body;
        const successRes = await CotravellerService.createCotraveller(tripid,cotraveller_name,cotraveller_userid,join_location);
        let data = {tripid, cotraveller_name : cotraveller_name, cotraveller_userid : cotraveller_userid, join_location : join_location}
        res.status(200).json(data);
    } catch (error) {
        throw error;
    }
}

exports.Update = async (req,res, next) => {
    try {
        const{tripid,cotraveller_name,cotraveller_userid,join_location} = req.body;
        const updateData = await CotravellerService.updateCotraveller(tripid,cotraveller_userid,cotraveller_name,join_location);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{tripid} = req.body;
        const deleteData = await CotravellerService.deleteCotraveller(tripid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {tripid} = req.body;
        const getData = await CotravellerService.getCotraveller(tripid);
        res.status(200).json(getData)
    } catch (error) {
        next(error);
    }
}