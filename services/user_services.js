const UserModel = require("../model/user_model");
const IdcodeServices = require("./idcode_services");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

class UserServices {
    static async registerUser(fname, lname, dob, gender, email, phone, address, state, postcode, password, kms, followers, following,interest) {
        try {
            var userid = await IdcodeServices.generateCode("Trip");
            const createUser = new UserModel({ userid, fname, lname, dob, gender, email, phone, address, state, postcode, password, kms, followers, following,interest });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }

    static async loginUser(phone) {
        try {
            return await UserModel.findOne({ phone });
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(userid, fname, lname, dob, gender, email, phone,kms,followers,following,interest, address, state, postcode) {
        try {
            var query = { userid: userid };
            var values = { $set: { fname: fname, lname: lname, dob: dob, gender: gender, email: email, phone: phone, address: address, state: state, postcode: postcode,kms:kms,followers:followers,following:following,interest:interest } };

            return await UserModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }



    static async followUser(loggedUserId, followedUserId) {
        try {
            const loggedUser = await UserModel.findOne({ userid: loggedUserId });
            const followedUser = await UserModel.findOne({ userid: followedUserId });

            if (!loggedUser || !followedUser) {
                return { success: false, message: 'User not found' };
            }

            loggedUser.following.push(followedUserId);
            await loggedUser.save();

            followedUser.followers.push(loggedUserId);
            await followedUser.save();

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Internal server error' };
        }
    };
    
    static async unfollowUser(loggedUserId, followedUserId) {
        try {
            const loggedUser = await UserModel.findOne({ userid: loggedUserId });
            const followedUser = await UserModel.findOne({ userid: followedUserId });

            if (!loggedUser || !followedUser) {
                return { success: false, message: 'User not found' };
            }

            loggedUser.following.pull(followedUserId);
            await loggedUser.save();

            followedUser.followers.pull(loggedUserId);
            await followedUser.save();

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Internal server error' };
        }
    };

    
    static async interest(userid, interest) {
        try {
            const User = await UserModel.findOne({ userid });
    
            if (!User) {
                return { success: false, message: 'User not found' };
            }
    
            User.interest.push( interest );
            await User.save();
    
            return { success: true, message: 'Interest added successfully', User };
        } catch (err) {
            return { success: false, message: 'Error adding Interest', error: err.message };
        }
    };
    
    static async deleteUser(userid) {
        try {
            var query = { userid: userid };
            return await UserModel.findOneAndDelete(query);

        } catch (error) {
            throw error;
        }
    }

    static async getUser() {
        try {

            return await UserModel.find()
        } catch (error) {
            throw error
        }
    }

    static async get(email) {
        try {

            return await UserModel.findOne({ email })
        } catch (error) {
            throw error
        }
    }

    static async getUserId(userid) {
        try {
            return await UserModel.findOne({ userid })
        } catch (error) {
            throw error
        }
    }

    static async checkuser(phone) {
        try {
            return await UserModel.findOne({ phone });

        } catch (error) {
            throw error;
        }
    }


}
module.exports = UserServices;