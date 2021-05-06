'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validator = require('../validators/user_email_validator')

var userSchema = new mongoose.Schema({
    email : {
        type : String,
        required: 'Email params not given',
        unique: true
    },
    password : {
        type : String,
        required: 'Password params not given',
        minlength : [8,'Password must be at least 8 character long']
    },
    firstName: {
        type : String,
        required: 'FirstName params not given'
    },
    lastName: {
        type : String,
        required: 'LastName params not given'
    },
    saltSecret: String
});

userSchema.path('email').validate((val) => {return validator.emailValidator(val)}, 'Invalid email params');

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
    return jwt.sign({ _id : this._id}, process.env.JWT_SECRET);
}

mongoose.model('User', userSchema, 'users');