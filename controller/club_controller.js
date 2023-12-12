const ClubService = require('../services/club_services');

exports.club = async(req,res,next) => {
    try {
        const {userid,club_id,clubname,clubdesc} = req.body;
        const {filename} = req.file;
        const club = await ClubService.createclub(userid,club_id,clubname,clubdesc,filename);
        
        let data = {userid, club_id,clubname : clubname, clubdesc : clubdesc, clubimage : req.file.filename};
        res.status(200).json(data);
    } catch (error) {
        next (error)
    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{club_id} = req.query;
        const deleteData = await ClubService.deleteclub(club_id);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {club_id} = req.query;
        const getData = await ClubService.getclub(club_id);
       // res.status(200).json(getData)
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}

exports.getclub = async(req,res,next) => {
    try {
        const User = await ClubService.get();
        res.status(200).json({token : User})
    } catch (error) {
        next(error);
    }
}