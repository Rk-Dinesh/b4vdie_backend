const ClubService = require('../services/club_services');
const path = require('path');
const fs = require('fs');

exports.createClub = async (req, res, next) => {
    try {
        const { userid, clubname, clubdesc ,followers} = req.body;
        const { clubimage, clubcover } = req.files;
        const club = await ClubService.createClub(userid, clubname, clubdesc,followers, clubimage[0].filename, clubcover[0].filename);

        const data = {
            userid,
            club_id: club.club_id,
            clubname,
            clubdesc,
            followers,
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
        const { clubimage } = req.files;

        const { updatedClub, oldImage } = await ClubService.updateImages(
            club_id,
            clubimage[0].filename
        );

        const data = {
            club_id,
            clubimage: clubimage[0].filename,
        };

        if (oldImage) {
            const oldImagePath = path.join(__dirname, '../club', oldImage);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Error deleting old image file: ${err.message}`);
                }
            });
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};


exports.updatecover= async (req, res, next) => {
    try {
        const { club_id } = req.query;
        const { clubcover } = req.files;

        const { updatedClub, oldImage } = await ClubService.updatecover(
            club_id,
            clubcover[0].filename
        );

        const data = {
            club_id,
            clubcoverimage: clubcover[0].filename
        };

        if (oldImage) {
            const oldImagePath = path.join(__dirname, '../club', oldImage);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Error deleting old image file: ${err.message}`);
                }
            });
        }

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


exports.delete = async (req, res, next) => {
    try {
        const { club_id } = req.query;
        const deleteData = await ClubService.deleteclub(club_id);

        if (deleteData) {
            const imagePaths = [
                path.join(__dirname, '../club', deleteData.clubimage),
                path.join(__dirname, '../club', deleteData.clubcoverimage)
            ];

            imagePaths.forEach(filePath => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${err.message}`);
                    }
                });
            });
        }

        res.status(200).json(deleteData);
    } catch (error) {
        next(error);
    }
};


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

exports.follow = async (req, res) => {
    try {

        console.log(req.body);
        const { loggedUserId } = req.body;
        
        const result = await ClubService.followClub(loggedUserId, req.params.followedClubId);

        if (result.success) {
            res.status(200).json({ message: 'Successfully followed club' });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.unfollow = async (req, res) => {
    try {

        console.log(req.body);
        const { loggedUserId } = req.body;
        
        const result = await ClubService.unfollowClub(loggedUserId, req.params.followedClubId);

        if (result.success) {
            res.status(200).json({ message: 'Successfully unfollowed club' });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};