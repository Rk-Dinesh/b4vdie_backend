const UserServices = require("../services/user_services");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user_model");

exports.register = async (req, res, next) => {
    try {
        const { userid, fname, lname, dob, gender, email, phone, address, state, postcode, password,kms,followers,following,interest } = req.body;
        const { userimage, coverimage } = req.files;

        const user = await UserServices.checkuser(phone);

        if(user){
         return res.status(400).json({message : "user already exist"})
        }

        const successRes = await UserServices.registerUser(fname, lname, dob, gender, email, phone, address, state, postcode, password,kms,followers,following,interest,userimage[0].filename, coverimage[0].filename);
        let userData = { userid : successRes.userid, fname: fname, lname: lname, dob: dob, gender: gender, email: email, phone: phone, address: address, state: state, postcode: postcode,kms:kms,followers:followers,following:following,interest : interest ,userimage: userimage[0].filename,coverimage: coverimage[0].filename};
        console.log(userData);
       return  res.status(200).json(userData)

    } catch (error) {
        throw error
    }
}

exports.login = async (req, res, next) => {
    try {
        const { phone } = req.body;

        const User = await UserServices.loginUser(phone);

        if (!User) {
            return res.status(401).json({ message: 'User not found' })
        }
        // const isMatch = await User.comparePassword(password);

        // if (!isMatch) {
        //     res.status(401).json({ message: 'Invalid Password' })
        // }

        // const token = jwt.sign({ email: email, role: 'user' }, 'Hackwit', { expiresIn: '1h' });

        let tokenData = {fname: User.fname,userid:User.userid,phone:User.phone,lname:User.lname,dob:User.dob,address:User.address,gender:User.gender,email:User.email,postcode:User.postcode,kms:User.kms,followers:User.followers,following:User.following,interest:User.interest,userimage: User.userimage,coverimage: User.coverimage}

        return res.status(200).json(tokenData);

    } catch (error) {
        throw error
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { userid, fname, lname, dob, gender, email, phone, address, state, postcode,kms} = req.body;
        const updateData = await UserServices.updateUser(userid, fname, lname, dob, gender, email, phone,address,state, postcode,kms);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.updateImage = async (req, res, next) => {
    try {
        const { userid } = req.query;
        const { userimage} = req.files;

        const updateimage = await UserServices.updateImages(
            userid,
            userimage[0].filename,
            
        );

        const data = {
            userid,
            userimage: userimage[0].filename,
        };

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.updatecover= async (req, res, next) => {
    try {
        const { userid } = req.query;
        const { coverimage } = req.files;

        const updatedCover= await UserServices.updatecover(
            userid,
            coverimage[0].filename
        );

        const data = {
            userid,
            coverimage: coverimage[0].filename
        };

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};


  

exports.follow = async (req, res) => {
    try {

        console.log(req.body);
        const { loggedUserId } = req.body;
        
        const result = await UserServices.followUser(loggedUserId, req.params.followedUserId);

        if (result.success) {
            res.status(200).json({ message: 'Successfully followed user' });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.unfollow = async (req, res) => {
    try {
        const { loggedUserId } = req.body;

        const result = await UserServices.unfollowUser(loggedUserId, req.params.followedUserId);

        if (result.success) {
            res.status(200).json({ message: 'Successfully unfollowed user' });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// exports.follow = async (req, res) => {
//     try {
//         const { loggedUserId } = req.body; // Assuming you pass logged user's ID in the request body

//         // Check if both users exist
//         const loggedUser = await UserModel.findOne({ userid: loggedUserId });
//         const followedUser = await UserModel.findOne({ userid: req.params.followedUserId });

//         if (!loggedUser || !followedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update the following array of the logged user
//         loggedUser.following.push(req.params.followedUserId);
//         await loggedUser.save();

//         // Update the followers array of the followed user
//         followedUser.followers.push(loggedUserId);
//         await followedUser.save();

//         res.status(200).json({ message: 'Successfully followed user' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.addInterest = async (req, res) => {
    const { interest } = req.body;
    const { userid } = req.params;

    try {
        const result = await UserServices.interest( userid, interest);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

exports.delete = async(req, res, next)=>{
    try{
        const{userid} = req.query;
        const User = await UserServices.deleteUser(userid);
        res.status(200).json(User)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const User = await UserServices.getUser();
        res.status(200).json({token : User})
    } catch (error) {
        next(error);
    }
}

exports.getUser = async(req,res,next) => {
    try {
        const {email} = req.query;
        const User = await UserServices.get(email);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.getUserId = async(req,res,next) => {
    try {
        const {userid} = req.query;
        const User = await UserServices.getUserId(userid);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.getfollowersDetails = async (req, res, next) => {
    try {
      const loggedInUserId = req.params.loggedInUserId; 
      const loggedInUser = await UserModel.findOne({ userid: loggedInUserId });
  
      if (!loggedInUser) {
        return res.status(404).json({ message: ' user not found' });
      }
  
      const allUsers = await UserServices.getUser();
      const followedUsers = allUsers.filter(user => loggedInUser.followers.includes(user.userid));
  
      if (followedUsers.length > 0) {
        res.json({ users: followedUsers });
      } else {
        res.status(404).json({ message: 'No followers' });
      }
    } catch (error) {
      next(error);
    }
  };

  exports.getfollowingDetails = async (req, res, next) => {
    try {
      const loggedInUserId = req.params.loggedInUserId; 
      const loggedInUser = await UserModel.findOne({ userid: loggedInUserId });
  
      if (!loggedInUser) {
        return res.status(404).json({ message: ' user not found' });
      }
  
      const allUsers = await UserServices.getUser();
      const followedUsers = allUsers.filter(user => loggedInUser.following.includes(user.userid));
  
      if (followedUsers.length > 0) {
        res.json({ users: followedUsers });
      } else {
        res.status(404).json({ message: 'No followers' });
      }
    } catch (error) {
      next(error);
    }
  };
