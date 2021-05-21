'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validator = require('../validator/user_email_validator')

var userSchema = new mongoose.Schema({
    email_address : {
        type : String,
        required: 'Email parameters required',
        unique: true,
        default: null
    },
    password : {
        type : String,
        required: 'Password parameters required',
        minlength : [8,'Password must be at least 8 character long'],
        default: null
    },
    first_name: {
        type : String,
        required: 'Firstname parameters required',
        default: null
    },
    last_name: {
        type : String,
        required: 'Lastname parameters required',
        default: null
    },
    genre: {
        type : String,
        default: null
    },
    age: {
        type : String,
        default: null
    },
    phone_number: {
        type : String,
        default: null
    },
    country: {
        type : String,
        required: 'Country parameters required',
        default: null
    },
    presentation: {
        type : String,
        default: null
    },
    favorites: {
        type : String,
        default: null
    },
    friends: {
        type : String,
        default: null
    },
    profil_picture: {
        type : String,
        default: null
    },
    security_level: {
        type : Number,
        required: 'Missing security level parameters'
    },

    saltSecret: String
});

userSchema.path('email_address').validate((val) => {return validator.emailValidator(val)}, 'Invalid email params');

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