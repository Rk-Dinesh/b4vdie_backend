const UserModel = require("../model/user_model");
const IdcodeServices = require("./idcode_services")

class UserServices{
    static async registerUser(fname,lname,dob,gender,email,phone,address,state,postcode,password){
        try{
            var userid = await IdcodeServices.generateCode("Trip");
            const createUser = new UserModel({userid,fname,lname,dob,gender,email,phone,address,state,postcode,password});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async loginUser(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(userid,fname,lname,dob,gender,email,phone,address,state,postcode){
        try {
            var query = {userid : userid};
            var values = {$set : {fname:fname, lname: lname, dob: dob, gender: gender, email: email, phone: phone, address: address, state: state, postcode: postcode}};
            
            return await UserModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteUser(userid){
        try{
            var query = {userid : userid};
            return await UserModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getUser(userid){
        try {
            var query = {userid : userid};
            return await UserModel.find(query)
        } catch (error) {
            throw error
        }
    }

  
}
module.exports = UserServices;