const PitstopService = require('../services/pitstop_services');

exports.pitstop = async(req,res,next)=>{
    try {
        const{tripid,pitstop_name,pitstop_location} = req.body;

        const successRes= await PitstopService.createPitstop(tripid,pitstop_name,pitstop_location);

       let data = {tripid, pitstop_name: pitstop_name, pitstop_location: pitstop_location}
       res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}
exports.Update = async (req,res, next) => {
    try {
        const{tripid,pitstop_name,pitstop_location} = req.body;
        const updateData = await PitstopService.updatepitstop(tripid,pitstop_name,pitstop_location);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{tripid} = req.body;
        const deleteData = await PitstopService.deletepitstop(tripid);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {tripid} = req.body;
        const getData = await PitstopService.getpitstop(tripid);
        res.status(200).json(getData)
    } catch (error) {
        next(error);
    }
}