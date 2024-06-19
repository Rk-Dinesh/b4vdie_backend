const ClubPostModel = require('../model/clubpost_model');
const UserModel = require("../model/user_model");
const IdcodeServices = require("./idcode_services");

class ClubPostServices {
    static async registerClubPost(club_id, userid, like,des,date,reporters,report,filename) {
        try {
            var clubpost_id = await IdcodeServices.generateCode("ClubPostId");
            const createpost = new ClubPostModel({ club_id, clubpost_id, userid, like,des,date,reporters,report,clubpostimage : filename });
            return await createpost.save();
        } catch (err) {
            throw err;
        }
    }

    static async like(clubpost_id, userid) {
        try {
            const clubPost = await ClubPostModel.findOne({ clubpost_id });

            if (!clubPost) {
                return { success: false, message: 'Club post not found' };
            }

            if (clubPost.like.includes(userid)) {
                return { success: false, message: 'User already liked the post' };
            }

            clubPost.like.push(userid);
            await clubPost.save();

            return { success: true, message: 'Like added successfully', clubPost };
        } catch (err) {
            throw err
        }
    };

    static async unlike(clubpost_id, userid) {
        try {
            const clubPost = await ClubPostModel.findOne({ clubpost_id });

            if (!clubPost) {
                return { success: false, message: 'Club post not found' };
            }

            clubPost.like.pull(userid);
            await clubPost.save();

            return { success: true, message: 'unliked successfully', clubPost };
        } catch (err) {
            throw err
        }
    };



    static async comment(clubpost_id, userid, comment) {
        try {
            const clubPost = await ClubPostModel.findOne({ clubpost_id });
    
            if (!clubPost) {
                return { success: false, message: 'Club post not found' };
            }
    
            clubPost.Comment.push({ userid, comment });
            await clubPost.save();
    
            return { success: true, message: 'Comment added successfully', clubPost };
        } catch (err) {
            return { success: false, message: 'Error adding comment', error: err.message };
        }
    };


    static async clubpost_id(clubpost_id) {
        try {
            var query = { clubpost_id: clubpost_id };
            return await ClubPostModel.findOneAndDelete(query);

        } catch (error) {
            throw error;
        }
    }

    static async club_id(club_id) {
        try {
            var query = { club_id: club_id };
            return await ClubPostModel.findOneAndDelete(query);

        } catch (error) {
            throw error;
        }
    }

    static async get(club_id) {
        try {

            return await ClubPostModel.find({ club_id })
        } catch (error) {
            throw error
        }
    }
    static async getOnePost(clubpost_id) {
        try {

            return await ClubPostModel.find({ clubpost_id })
        } catch (error) {
            throw error
        }
    }

    static async report(clubpost_id, userid, reporters) {
        try {
            const clubPost = await ClubPostModel.findOne({ clubpost_id });
    
            if (!clubPost) {
                return { success: false, message: 'Club post not found' };
            }
    
            if (clubPost.report.includes(userid)) {
                return { success: false, message: 'User already liked the post' };
            }
    
            clubPost.report.push(userid);
            clubPost.reporters = reporters; // update the reporters field
            await clubPost.save();
    
            return { success: true, message: 'Like added successfully', clubPost };
        } catch (err) {
            throw err
        }
    };
};

module.exports = ClubPostServices;