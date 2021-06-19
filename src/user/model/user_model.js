'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validator = require('../validator/user_email_validator')

var userSchema = new mongoose.Schema({
    emailAddress : {
        type : String,
        required: 'Email parameters required',
        maxlength : [100,'email address maximum length is 100 character'],
        unique: true,
        default: null
    },
    password : {
        type : String,
        required: 'Password parameters required',
        minlength : [8,'Password must be at least 8 character long'],
        default: null
    },
    firstName: {
        type : String,
        required: 'Firstname parameters required',
        maxlength : [50,'first_name maximum length is 50 character'],
        default: null
    },
    lastName: {
        type : String,
        required: 'Lastname parameters required',
        maxlength : [50,'last_name maximum length is 50 character'],
        default: null
    },
    creationDatetime: {
        type : Number,
        required: 'CreationDatetime parameters required',
        default: null
    },
    genre: {
        type : String,
        maxlength : [6,'genre maximum length is 6 character'],
        default: null
    },
    age: {
        type : Number,
        default: null
    },
    phoneNumber: {
        type : String,
        maxlength : [20,'genre maximum length is 20 character'],
        default: null
    },
    country: {
        type : String,
        maxlength : [50,'genre maximum length is 50 character'],
        default: null
    },
    presentation: {
        type : String,
        maxlength : [500,'genre maximum length is 500 character'],
        default: null
    },
    favorites: {
        type : String,
        default: null
    },
    profilPicture: {
        type : String,
        default: null
    },
    securityLevel: {
        type : Number,
        required: 'Missing security level parameters'
    },

    saltSecret: String
});

userSchema.path('emailAddress').validate((val) => {return validator.emailValidator(val)}, 'Invalid email params');

userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password); 
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id : this._id}, process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema, 'users');