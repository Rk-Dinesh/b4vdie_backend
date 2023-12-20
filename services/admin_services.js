const AdminModel =require('../model/admin_model');
const IdcodeServices = require("./idcode_services");
const bcrypt = require('bcrypt');

class AdminServices{
    static async registerAdmin(fname,lname,email,phone,role,password){
        try{
            var userid = await IdcodeServices.generateCode("Admin");
            const createUser = new AdminModel({userid,fname,lname,email,phone,role,password});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async loginAdmin(email){
        try {
            return await AdminModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async checkIfUserExists(email) {
        try {
          const user = await AdminModel.findOne({ email });
          return !!user; 
        } catch (error) {
          throw new Error('Error checking user existence');
        }
      };

    static async updateAdmin(userid,fname,lname,email,phone,role){
        try {
            var query = {userid : userid};
            var values = {$set : {fname:fname, lname: lname, email: email, phone: phone, role : role}};
            
            return await AdminModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteAdmin(userid){
        try{
            var query = {userid : userid};
            return await AdminModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getUser(userid){
        try {
            
            return await AdminModel.findOne({userid})
        } catch (error) {
            throw error
        }
    }

    static async getemail(email){
        try {
            
            return await AdminModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async getUseradmin(){
        try {
            return await AdminModel.find();
        } catch (error) {
            throw error
        }
    }

    static async updatePassword(email, newPassword) {
        try {
            const newPasswordHash = await bcrypt.hash(newPassword, 10);

            const updatedDoctor = await AdminModel.findOneAndUpdate(
                { email: email },
                {
                    $set: {
                        password: newPasswordHash,
                    }
                },
                { new: true }
            );

            return updatedDoctor;
        } catch (err) {
            throw new Error('An error occurred while updating the doctor: ' + err.message);
        }
    };

  
}
module.exports = AdminServices;