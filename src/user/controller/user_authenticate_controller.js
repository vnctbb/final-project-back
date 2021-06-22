'use strict';

const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User')

exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log("ERR => ", err)
            return res.status(400).json({"err":err, "message":err.message, "error" : error});
        } else if(user){
            return res.status(200).json({ "token" : user.generateJwt() });
        } else {
            console.log("INFO => ", info)
            return res.status(404).json(info);
        }
    })(req, res);
};

exports.authenticateAdmin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log("ERR => ", err)
            return res.status(400).json(err);
        } else if(user){
            if(user.securityLevel < 6){
                return res.status(403).json({"error" : "Access forbidden"});
            }
            return res.status(200).json({"token" : user.generateJwt() });
        } else {
            console.log("INFO => ", info)
            return res.status(404).json(info);
        }
    })(req, res);
};

exports.isAdmin = async (req, res, next) => {

    let user = await User.findOne({_id : req._id})
    if(user){
        if(user.securityLevel > 6){
            console.log("isAdmin - Authorized")
            return res.status(200).json({status : false, message : "Error : User not found"});
        } else {
            console.log("isAdmin - Unauthorized")
            return res.status(403).json({status : false, message : "Error : Unauthorized access"});
        }
    } else {
        console.log("isAdmin - User not found")
        return res.status(400).json({status : false, message : "Error : User not found"});
    }

}