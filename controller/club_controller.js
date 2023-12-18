const ClubService = require('../services/club_services');

exports.createClub = async (req, res, next) => {
    try {
        const { userid, clubname, clubdesc } = req.body;
        const { clubimage, clubcover } = req.files;
        const club = await ClubService.createClub(userid, clubname, clubdesc, clubimage[0].filename, clubcover[0].filename);

        const data = {
            userid,
            club_id: club.club_id,
            clubname,
            clubdesc,
            clubimage: clubimage[0].filename,
            clubcoverimage: clubcover[0].filename
        };
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.updateImage = async (req, res, next) => {
    try {
        const { club_id } = req.query;
        const { clubimage} = req.files;

        const updatedClub = await ClubService.updateImages(
            club_id,
            clubimage[0].filename,
            
        );

        const data = {
            club_id,
            clubimage: clubimage[0].filename,
        };

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.updatecover= async (req, res, next) => {
    try {
        const { club_id } = req.query;
        const { clubcover } = req.files;

        const updatedClub = await ClubService.updatecover(
            club_id,
            clubcover[0].filename
        );

        const data = {
            club_id,
            clubcoverimage: clubcover[0].filename
        };

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { club_id } = req.query;
        const {clubname,clubdesc} = req.body
       
        const updatedClub = await ClubService.updatename(
            club_id,
            clubname,
            clubdesc
        );

        const data = {
            club_id,
            clubname : clubname,
            clubdesc : clubdesc,
        };

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};


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