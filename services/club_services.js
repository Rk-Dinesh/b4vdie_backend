const ClubModel = require('../model/club_model');
const IdcodeServices = require('../services/idcode_services')

class ClubService {

    static async createClub(userid, clubname, clubdesc, clubimage, clubcoverimage) {
        try {
            const club_id = await IdcodeServices.generateCode("ClubId");
            const newClub = new ClubModel({
                userid,
                club_id,
                clubname,
                clubdesc,
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


};

module.exports = ClubService;