const UserServices = require("../services/user_services");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {
        const { userid, fname, lname, dob, gender, email, phone, address, state, postcode, password } = req.body;

        const successRes = await UserServices.registerUser(fname, lname, dob, gender, email, phone, address, state, postcode, password);
        let userData = { userid, fname: fname, lname: lname, dob: dob, gender: gender, email: email, phone: phone, address: address, state: state, postcode: postcode };
        res.status(200).json(userData)

    } catch (error) {
        throw error
    }
}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const User = await UserServices.loginUser(email, password);

        if (!User) {
            res.status(401).json({ message: 'User not found' })
        }
        const isMatch = await User.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: 'Invalid Password' })
        }

        const token = jwt.sign({ email: email, role: 'user' }, 'Hackwit', { expiresIn: '1h' });

        res.status(200).json({ token });

    } catch (error) {
        throw error
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { userid, fname, lname, dob, gender, email, phone, address, state, postcode} = req.body;
        const updateData = await UserServices.updateUser(userid, fname, lname, dob, gender, email, phone, address, state, postcode);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{userid} = req.body;
        const User = await UserServices.deleteUser(userid);
        res.status(200).json(User)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {userid} = req.body;
        const User = await UserServices.getUser(userid);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

