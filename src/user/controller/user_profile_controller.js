'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User');

exports.userProfile = (req, res, next) => {

    User.findOne({_id : req._id}, {password : 0, saltSecret : 0, __v : 0}, (err, user) => {
        if(!user){
            return res.status(404).json({status : false, message : 'User record not found.'});
        } else {
            if(!err){
                return res.status(200).json({status : true, user : user});
            } else {
                return next(err);
            }
        }
    })
}