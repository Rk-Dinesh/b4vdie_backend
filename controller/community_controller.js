const UserModel = require('../model/user_model');
const CommunityService = require('../services/community_service');

exports.community = async(req,res,next) => {
    try {
        const {userid,community_id,date,desc,like} = req.body;
        const {filename} = req.file;
        const community = await CommunityService.createcommunity(userid,date,desc,like,filename);
        
        let data = {userid, community_id,date : date, desc : desc,like:like, image : req.file.filename};
        res.status(200).json(data);
    } catch (error) {
        next (error)
    }
}

exports.like = async (req, res,next) => {
    const { userid } = req.body;
    const { community_id } = req.params;

    try {
        const result = await CommunityService.like(community_id, userid);

        if (!result.success) {
            return res.status(result.success ? 200 : 400).json({ message: result.message });
        }
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};


exports.unlike = async (req, res, next) => {

    const { userid } = req.body;
    const { community_id } = req.params;

    try {
        const result = await CommunityService.unlike(community_id, userid);

        if (!result.success) {
            return res.status(result.success ? 200 : 400).json({ message: result.message });
        }
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};

exports.get = async(req,res,next) => {
    try {
        const {userid} = req.query;
        const getData = await CommunityService.getcommunity(userid);
       // res.status(200).json(getData)
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}

exports.getcommunity = async(req,res,next) => {
    try {
        const User = await CommunityService.get();
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.getOneCommunityPost = async(req,res,next) => {
    try {
        const {community_id} = req.query;
        const getData = await CommunityService.getcommunityPost(community_id);
       // res.status(200).json(getData)
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{community_id} = req.query;
        const deleteData = await CommunityService.deletecommunity(community_id);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.getfollowersDetails = async (req, res, next) => {
    try {
      const loggedInUserId = req.params.loggedInUserId; 
      const loggedInUser = await UserModel.findOne({ userid: loggedInUserId });
  
      if (!loggedInUser) {
        return res.status(404).json({ message: ' user not found' });
      }
  
      const allUsers = await CommunityService.get();
      const Post = allUsers.filter(user => loggedInUser.followers.includes(user.userid));
  
      if (Post.length > 0) {
        res.json({ Posts: Post });
      } else {
        res.status(404).json({ message: 'No followers' });
      }
    } catch (error) {
      next(error);
    }
  };