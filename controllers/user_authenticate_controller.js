'use strict';

const mongoose = require('mongoose');
const passport = require('passport');

exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return res.status(400).json(err);
        } else if(user){
            return res.status(200).json({ "token" : user.generateJwt() });
        } else {
            return res.status(404).json(info);
        }
    })(req, res);
};

exports.checkSecurityLevel = (req, res, next) => {
    console.log(req._id);
}