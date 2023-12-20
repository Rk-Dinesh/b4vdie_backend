const AdminServices = require('../services/admin_services');
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {
        const { userid, fname, lname, email, phone, role, password } = req.body;

        const Res = await AdminServices.registerAdmin(fname, lname, email, phone, role, password);
        let userData = { userid, fname: fname, lname: lname, email: email, phone: phone,role :role,password:password };
        res.status(200).json(userData)

    } catch (error) {
        next(error)
    }
}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const Admin = await AdminServices.loginAdmin(email, password);

        if (!Admin) {
           return res.status(401).json({ message: 'Admin not found' })
        }
        const isMatchAdmin = await Admin.comparePasswords(password);

        if (!isMatchAdmin) {
           return res.status(401).json({ message: 'Invalid Password' })
        }

        const token = jwt.sign({ email: email, role: 'Admin' }, 'Hackwit', { expiresIn: '1h' });

       return  res.status(200).json({ token });

    } catch (error) {
       next(error);
        
    }
}

exports.checkUser = async (req, res) => {
    const { email } = req.body;
  
    try {
      const userExists = await AdminServices.checkIfUserExists(email);
  
      if (userExists) {
        res.status(200).json({ exists: true, message: 'User exists' });
      } else {
        res.status(404).json({ exists: false, message: 'User does not exist' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error checking user existence', error: error.message });
    }
  };

exports.Update = async (req,res, next) => {
    try {
        const { userid, fname, lname, email, phone, role} = req.body;
        const updateData = await AdminServices.updateAdmin(userid, fname, lname, email, phone,role);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{userid} = req.query;
        const User = await AdminServices.deleteAdmin(userid);
        res.status(200).json(User)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {userid} = req.query;
        const User = await AdminServices.getUser(userid);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.getAdmin = async(req,res,next) =>{
    try {
        const Admin = await AdminServices.getUseradmin();
        res.status(200).json(Admin)
    } catch (error) {
        
    }
}

exports.getEmail = async(req,res,next) => {
    try {
        const {email} = req.query;
        const User = await AdminServices.getemail(email);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.UpdatePassword = async (req, res) => {
    const email = req.params.email;
    const newPassword = req.body.password;

    try {
        const updatedDoctor = await AdminServices.updatePassword(email, newPassword);

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json(updatedDoctor);
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while updating the doctor', error: err.message });
    }
};
