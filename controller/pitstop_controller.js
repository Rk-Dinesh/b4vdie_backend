const PitstopService = require('../services/pitstop_services');

exports.pitstop = async(req,res,next)=>{
    try {
        const{tripid,pitstopid,pitstop_name,pitstop_location} = req.body;

        const successRes= await PitstopService.createPitstop(tripid,pitstopid,pitstop_name,pitstop_location);

       let data = {tripid,pitstopid, pitstop_name: pitstop_name, pitstop_location: pitstop_location}
       res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}
exports.Update = async (req,res, next) => {
    try {
        const{pitstopid,tripid,pitstop_name,pitstop_location} = req.body;
        const updateData = await PitstopService.updatepitstop(pitstopid,tripid,pitstop_name,pitstop_location);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{pitstopid} = req.query;
        const deleteData = await PitstopService.deletepitstop(pitstopid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.deletepitstop = async(req, res, next)=>{
    try{
        const{tripid} = req.query;
        const deleteData = await PitstopService.delete(tripid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {tripid} = req.query;
        const getData = await PitstopService.getpitstop(tripid);
       // res.status(200).json(getData)
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}