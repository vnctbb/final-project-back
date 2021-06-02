'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Topic = mongoose.model('Topic');

const option_validator = require('../../validator/list_option_validator');

exports.findOne = async (req, res, next) => {

    if(!req.body.topicId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let topic = await Topic.findOne({_id : req.body.topicId}, {__v : 0});
    if (!topic){

        return res.status(400).json({status : false, message : "Error : Topic not found"});
    }

    return res.status(200).json({status : true, topic : topic});

};

exports.list = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    let topics = await Topic.find({}, {__v : 0}, optionV);
    if (topics.length == 0){

        return res.status(400).json({status : false, message : "Error : Topics not found"});
    }

    return res.status(200).json({status : true, topics : topics});

};

exports.listByOwnerId = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if (!req.body.params.ownerId){

        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let user = await User.findOne({_id : req.body.params.ownerId}, {__v : 0});
    if (!user){

        return res.status(400).json({status : false, message : "Error : Owner not found"});
    }

    let topics = await Topic.find({owner_id : req.body.params.ownerId}, {__v : 0, owner_id : 0}, optionV);
    if (topics.length == 0){

        return res.status(400).json({status : false, message : "Error : Topics not found"});
    }

    return res.status(200).json({status : true, topics : topics});

};

