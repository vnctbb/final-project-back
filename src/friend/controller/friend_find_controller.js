'use strict'

const mongoose = require('mongoose')
const Friend = mongoose.model('Friend')

const option_validator = require('../validator/list_option_validator');

exports.findOneById = (req, res, next) => {

    Friend.findOne({_id : req.body.params.id}, (err, friend) => {
        if(friend){
            res.json(friend);
        } else {
            return next(friend);
        }
    });

};

exports.exist = (req, res, next) => {

    if(!req.body.params){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    Friend.findOne({sender_id : req.body.params.sender_id, receiver_id : req.body.params.receiver_id}, (err, friend) => {
        if(friend){
            res.json(friend);
        } else {
            return next(err);
        }
    });

};

exports.findInFriendListByUser = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    Friend.find({receiver_id : req._id, status : 'WAITING'}, {__v : 0}, optionV, (err, friends) => {
        if(friends){
            return res.status(200).json({status : true, users : users});
        } else {
            return next(err);
        }
    });
};

exports.findOutFriendListByUser = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    Friend.find({sender_id : req._id, status : 'WAITING'}, {__v : 0}, optionV, (err, friends) => {
        if(friends){
            return res.status(200).json({status : true, users : users});
        } else {
            return next(err);
        }
    });
};

exports.findAcceptedFriendListByUser = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    Friend.find({sender_id : req._id, receiver_id : req._id, status : 'ACCEPTED'}, {__v : 0}, optionV, (err, friends) => {
        if(friends){
            return res.status(200).json({status : true, users : users});
        } else {
            return next(err);
        }
    });
};



