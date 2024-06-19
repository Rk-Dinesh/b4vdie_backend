const { community } = require('../controller/community_controller');
const CommunityModel = require('../model/communitypost_model');
const IdcodeServices = require('../services/idcode_services')

class CommunityService {

    static async createcommunity (userid,date,desc,like,reporters,report,filename) {
        try {
            var community_id = await IdcodeServices.generateCode("CommunityId");
            const newimage = new CommunityModel({
                userid,
                community_id ,
                date : date,
                desc : desc,
                like : like,
                reporters:reporters,
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

    static async report(community_id, userid, reporters) {
        try {
            const communityPost = await CommunityModel.findOne({ community_id });
    
            if (!communityPost) {
                return { success: false, message: 'CommunityPost not found' };
            }
    
            if (communityPost.report.includes(userid)) {
                return { success: false, message: 'User already liked the post' };
            }
    
            communityPost.report.push(userid);
            communityPost.reporters = reporters; // update the reporters field
            await communityPost.save();
    
            return { success: true, message: 'Like added successfully', communityPost };
        } catch (err) {
            throw err
        }
    };

};

module.exports = CommunityService;