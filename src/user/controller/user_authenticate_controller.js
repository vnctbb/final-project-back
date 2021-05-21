'use strict';

const mongoose = require('mongoose');
const passport = require('passport');

exports.authenticate = (req, res, next) => {
    console.log('ici')
    passport.authenticate('local', (err, user, info) => {
        console.log(user)
        if(err){
            console.log("ERR => ", err)
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