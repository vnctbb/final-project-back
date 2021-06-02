'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

const option_validator = require('../validator/list_option_validator');

exports.findOneById = (req, res, next) => {

    if(!req.body.userId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    User.findOne({_id : req.body.userId}, {password : 0, saltSecret : 0, __v : 0}, (err, user) => {
        if(user){
            if(!err){
                res.json(user);
            } else {
                return next(err);
            }
        } else {
            return res.status(400).json({status : false, message : "Error : User not found"});
        }
    });

};

exports.findOneMinById = (req, res, next) => {

    if(!req.body.userId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    User.findOne({_id : req.body.userId}, 'first_name last_name', (err, user) => {
        if(user){
            if(!err){
                res.json(user);
            } else {
                return next(err);
            };
        } else {
            return res.status(400).json({status : false, message : "Error : User not found"});
        }
    });

};

exports.findList = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    User.find({}, {password : 0, saltSecret : 0, __v : 0}, optionV, (err, users) => {
        if(users.length == 0){
            return res.status(400).json({status : false, message : "Error : User not found"});
        } else {
            if(!err){
                return res.status(200).json({status : true, users : users});
            } else {
                return next(err);
            }
        }
    });
};

exports.findListMin = (req, res, next) => {
    const fields = {
        _id : 1,
        firstName : 1,
        lastName : 1,
        emailAddress : 1,
        securityLevel : 1
    }

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    User.find({}, fields, optionV, (err, users) => {
        if(users.length == 0){
            return res.status(400).json({status : false, message : "Error : User not found"});
        } else {
            if(!err){
                return res.status(200).json({status : true, users : users});
            } else {
                return next(err);
            }
        }
    });
};

