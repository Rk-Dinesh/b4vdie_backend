const ClubModel = require('../model/club_model');
const UserModel = require('../model/user_model');
const IdcodeServices = require('../services/idcode_services')

class ClubService {

    static async createClub(userid, clubname, clubdesc,followers, clubimage, clubcoverimage) {
        try {
            const club_id = await IdcodeServices.generateCode("ClubId");
            const newClub = new ClubModel({
                userid,
                club_id,
                clubname,
                clubdesc,
                followers, 
                clubimage,
                clubcoverimage
            });
            return await newClub.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateImages(club_id,clubimage) {
        try {
            const updatedClub = await ClubModel.findOneAndUpdate(
                { club_id },
                { $set: {clubimage } },
                { new: true }
            );
            return updatedClub;
        } catch (error) {
            throw error;
        }
    }

    static async updatecover(club_id,clubcoverimage) {
        try {
            const updatedClub = await ClubModel.findOneAndUpdate(
                { club_id },
                { $set: {clubcoverimage } },
                { new: true }
            );
            return updatedClub;
        } catch (error) {
            throw error;
        }
    }

    static async updatename(club_id,clubname, clubdesc) {
        try {
            const updatedClub = await ClubModel.findOneAndUpdate(
                { club_id },
                { $set: { clubname,clubdesc} },
                { new: true }
            );
            return updatedClub;
        } catch (error) {
            throw error;
        }
    }

    static async deleteclub(club_id){
        try{
            var query = {club_id : club_id};
            return await ClubModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getclub(club_id){
        try {
            
            return await ClubModel.find({club_id})
        } catch (error) {
            throw error
        }
    }

    
    static async get(){
        try {
           
            return await ClubModel.find()
        } catch (error) {
            throw error
        }
    }

    static async followClub(loggedUserId, followedClubId) {
        try {
            const loggedUser = await UserModel.findOne({ userid: loggedUserId });
           
            const followedClub = await ClubModel.findOne({ club_id: followedClubId });
            
           
            if (!loggedUser || !followedClub) {
                return { success: false, message: 'User not found' };
            }

            followedClub.followers.push(loggedUserId);
            await followedClub.save();

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Internal server error' };
        }
    };
    
    static async unfollowClub(loggedUserId, followedClubId) {
        try {
            const loggedUser = await UserModel.findOne({ userid: loggedUserId });
           
            const followedClub = await ClubModel.findOne({ club_id: followedClubId });
            
           
            if (!loggedUser || !followedClub) {
                return { success: false, message: 'User not found' };
            }

            followedClub.followers.pull(loggedUserId);
            await followedClub.save();

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Internal server error' };
        }
    };


};

module.exports = ClubService;