'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Topic = mongoose.model('Topic');
const TopicMessage = mongoose.model('TopicMessage');

const option_validator = require('../../validator/list_option_validator');

exports.count = async (req, res, next) => {
    let topicMessageLength = await TopicMessage.count({topicId : req.body.topicId});
    if (!topicMessageLength){

        return res.status(200).json({status : true, count : 0});
    }

    return res.status(200).json({status : true, count : topicMessageLength})
}

exports.findTopicMessage = async (req, res, next) => {

    if(!req.body.topicmessageId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let topicmessage = await TopicMessage.findOne({_id : req.body.topicmessageId}, {__v : 0});
    if(!topicmessage){

        return res.status(400).json({status : false, message : "Error : TopicMessage not found"});
    }

    return res.status(200).json({status : true, topicmessage : topicmessage});

};

exports.listByTopicId = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(!req.body.topicId){

        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let topic = await Topic.findOne({_id : req.body.topicId}, {__v : 0});
    if (!topic){
        
        return res.status(400).json({status : false, message : "Error : Topic not found"});

    }

    console.log(optionV)

    let messages = await TopicMessage.find({topicId : req.body.topicId}, {__v : 0, topicId : 0}, optionV);
    if (messages.length == 0){
        
        return res.status(200).json({status : true, topicmessage : [], topicId : req.body.topicId});
    }

    console.log(messages)

    return res.status(200).json({status : true, topicmessage : messages, topicId : req.body.topicId});

};

exports.listByAuthorId = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(!req.body.params.author_id){

        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let user = await User.findOne({_id : req.body.params.authorId}, {__v : 0});
    if (!user){

        return res.status(400).json({status : false, message : "Error : Author not found"});
    }

    let messages = await TopicMessage.find({authorId : req.body.params.authorId}, {__v : 0, authorId : 0}, optionV);
    if (messages.length == 0){

        return res.status(400).json({status : false, message : "Error : Topics not found"});
    }

    return res.status(200).json({status : true, topicmessage : messages, authorId : req.body.params.authorId});

};

