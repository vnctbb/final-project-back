'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Topic = mongoose.model('Topic');
const TopicMessage = mongoose.model('TopicMessage');

const option_validator = require('../validator/list_params_validator');

exports.findTopicMessage = (req, res, next) => {

    if(!req.body.topicmessage_id){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    TopicMessage.findOne({_id : req.body.topicmessage_id}, {__v : 0}, (err, topicmessage) => {
        if(topicmessage){
            if(!err){
                res.json(topicmessage);
            } else {
                return next(err);
            }
        } else {
            return res.status(400).json({status : false, message : "Error : Topic not found"});
        }
    });

};

exports.findListByTopicId = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(req.body.topic_id){
        Topic.findOne({_id : req.body.topic_id}, {__v : 0}, optionV, (err, user) => {
            if(user){
                TopicMessage.find({topic_id : req.body.topic_id}, {__v : 0, topic_id : 0}, (err, messages) => {
                    if(messages.len == 0){
                        return res.status(400).json({status : false, message : "Error : Topics not found"});
                    } else {
                        return res.status(200).json({status : true, topicmessage : messages, topic_id : req.body.topic_id});
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

exports.findListByAuthorId = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(req.body.author_id){
        User.findOne({_id : req.body.author_id}, {__v : 0}, optionV, (err, user) => {
            if(user){
                TopicMessage.find({author_id : req.body.author_id}, {__v : 0, author_id : 0}, (err, messages) => {
                    if(messages.len == 0){
                        return res.status(400).json({status : false, message : "Error : Topics not found"});
                    } else {
                        return res.status(200).json({status : true, topicmessage : messages, author_id : req.body.author_id});
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

