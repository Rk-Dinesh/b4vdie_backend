const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectId } = mongoose.Schema.Types
const db = require('../config/db');

const { Schema } = mongoose;

const UserSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    kms: {
        type: String,
        required: true,
    },
    followers: {
        type: [String],
    },
    following: {
        type: [String],
    },
    interest: {
        type: [String],
    },
    userimage : {
        type : String,
        required : true,
    },
    coverimage: { 
        type: String,
        required: true,
    }

});

UserSchema.pre('save', async function () {
    try {
        var user = this;
        const salt = await (bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password, salt);
        user.password = hashpass;

    } catch (error) {
        throw error
    }

});


UserSchema.methods.comparePassword = async function (userPasword) {
    try {
        const isMatch = await bcrypt.compare(userPasword, this.password);
        return isMatch;

    } catch (error) {
        throw error
    }
}

const UserModel = db.model('user', UserSchema);

module.exports = UserModel;