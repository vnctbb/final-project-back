'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

const option_validator = require('../validator/list_option_validator');

exports.findOneById = (req, res, next) => {

    User.findOne({_id : req.body.params.id}, {password : 0, saltSecret : 0, __v : 0}, (err, user) => {
        if(user){
            res.json(user);
        } else {
            return next(err);
        }
    });

};

exports.findOneMinById = (req, res, next) => {

    User.findOne({_id : req.body.params.id}, 'first_name last_name', (err, user) => {
        if(user){
            res.json(user);
        } else {
            return next(err);
        }
    });

};

exports.findList = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    User.find({}, {password : 0, saltSecret : 0, __v : 0}, optionV, (err, users) => {
        if(!err){
            return res.status(200).json({status : true, users : users});
        } else {
            return next(err);
        }
    });
};

exports.findListMin = (req, res, next) => {
    const fields = {
        _id : 1,
        first_name : 1,
        last_name : 1,
        email_address : 1,
        security_level : 1
    }

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    User.find({}, fields, optionV, (err, users) => {
        if(!err){
            return res.status(200).json({status : true, users : users});
        } else {
            return next(err);
        }
    });
};

