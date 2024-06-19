const { community } = require('../controller/community_controller');
const CommunityModel = require('../model/communitypost_model');
const IdcodeServices = require('../services/idcode_services')

class CommunityService {

    static async createcommunity (userid,date,desc,like,report,filename) {
        try {
            var community_id = await IdcodeServices.generateCode("CommunityId");
            const newimage = new CommunityModel({
                userid,
                community_id ,
                date : date,
                desc : desc,
                like : like,
                report:report,
                image : filename
            })
            return await newimage.save();
        } catch (error) {
            throw error;
        }
    }

    static async like(community_id, userid) {
        try {
            const community = await CommunityModel.findOne({ community_id });

            if (!community) {
                return { success: false, message: 'community  not found' };
            }

            if (community.like.includes(userid)) {
                return { success: false, message: 'User already liked the post' };
            }

            community.like.push(userid);
            await community.save();

            return { success: true, message: 'Like added successfully', community };
        } catch (err) {
            throw err
        }
    };

    static async unlike(community_id, userid) {
        try {
            const community = await CommunityModel.findOne({ community_id });

            if (!community) {
                return { success: false, message: 'Community not found' };
            }

            community.like.pull(userid);
            await community.save();

            return { success: true, message: 'unliked successfully', community };
        } catch (err) {
            throw err
        }
    };

    static async deletecommunity(community_id){
        try{
            var query = {community_id : community_id};
            return await CommunityModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    
    static async getcommunity(userid){
        try {
            
            return await CommunityModel.find({userid})
        } catch (error) {
            throw error
        }
    }

    
    static async get(){
        try {
           
            return await CommunityModel.find()
        } catch (error) {
            throw error
        }
    }

      
    static async getcommunityPost(community_id){
        try {
            
            return await CommunityModel.find({community_id})
        } catch (error) {
            throw error
        }
    }

    static async update(community_id,report) {
        try {
            var query = { community_id: community_id };
            var values = { $set: {report:report} };

            return await CommunityModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

};

module.exports = CommunityService;