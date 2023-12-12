const ClubModel = require('../model/club_model');
const IdcodeServices = require('../services/idcode_services')

class ClubService {

    static async createclub (userid,club_id,clubname,clubdesc,filename) {
        try {
            var club_id = await IdcodeServices.generateCode("ClubId");
            const newimage = new ClubModel({
                userid,
                club_id ,
                clubname : clubname,
                clubdesc : clubdesc,
                clubimage : filename
            })
            return await newimage.save();
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