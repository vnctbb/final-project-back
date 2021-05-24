'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Topic = mongoose.model('Topic');

const option_validator = require('../validator/list_params_validator');

exports.findTopic = (req, res, next) => {

    if(!req.body.topic_id){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    Topic.findOne({_id : req.body.topic_id}, {__v : 0}, (err, topic) => {
        if(topic){
            if(!err){
                return res.status(200).json({status : true, topic : topic});
            } else {
                return next(err);
            }
        } else {
            return res.status(400).json({status : false, message : "Error : Topic not found"});
        }
    });

};

exports.findList = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    Topic.find({}, {__v : 0}, optionV, (err, topics) => {
        if(topics.len == 0){
            return res.status(400).json({status : false, message : "Error : Topics not found"});
        } else {
            if(!err){
                return res.status(200).json({status : true, topics : topics});
            } else {
                return next(err);
            }
        }
    });

};

exports.findListByOwnerId = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(req.body.owner_id){
        User.findOne({_id : req.body.owner_id}, {__v : 0}, optionV, (err, user) => {
            if(user){
                Topic.find({owner_id : req.body.owner_id}, {__v : 0, owner_id : 0}, (err, topics) => {
                    if(topics.len == 0){
                        return res.status(400).json({status : false, message : "Error : Topics not found"});
                    } else {
                        if(!err){
                            return res.status(200).json({status : true, topics : topics});
                        } else {
                            return next(err);
                        }
                    }
                });
            } else {
                return res.status(400).json({status : false, message : "Error : Owner not found"});
            }
        });
    } else {
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }
};

