'use strict'

const mongoose = require('mongoose')
const Friend = mongoose.model('Friend')

const option_validator = require('../../validator/list_option_validator');

exports.findOne = async (req, res, next) => {

    if(!req.body.friendId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let friend;
    try {

        friend = await Friend.findOne({_id : req.body.friendId});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!friend){
        
        return res.status(400).json({status : false, message : "Error : Friend not found"});
    }

    return res.status(200).json({status : true, friend : friend});

};

exports.exist = async (req, res, next) => {

    if(!req.body.params){
        if(req.body.params.senderId || req.body.params.receiverId){
            return res.status(400).json({status : false, message : 'Invalid parameters'});
        }
    }

    let friend 
    try {
        friend = await Friend.findOne({senderId : req.body.params.senderId, receiverId : req.body.params.receiverId});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    if(!friend){

        return res.status(400).json({status : false, message : "Error : Friend not found"});
    }
    
    return res.status(200).json({status : true, friend : friend});

};

exports.listInByUser = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    let friends;
    try {
        friends = await Friend.find({receiverId : req._id, status : 'WAITING'}, {__v : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    return res.status(200).json({status : true, friends : friends});

};

exports.listOutByUser = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    let friends;
    try {

        friends = await Friend.find({senderId : req._id, status : 'WAITING'}, {__v : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    return res.status(200).json({status : true, friends : friends});

};

exports.listAcceptedByUser = async (req, res, next) => {

    let optionV = {};
    let userId;

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);

        if(req.body.params.userId){
            let friend = await Friend.findOne({senderId : req._id, receiverId : req.body.params.userId});
    
            if(!friend){
                friend = await Friend.findOne({senderId : req.body.params.userId, receiverId : req._id});
    
                if(!friend){
    
                    return res.status(400).json({status : false, message : "Error : FriendShip not found"});
                }
            }
    
            userId = req.body.params.userId
        }
    }

    if(!userId){
        userId = req._id
    }
    

    let friends;
    try {

        friends = await Friend.find({$or: [{ senderId: userId }, { receiverId: userId }], status : 'ACCEPTED'}, {__v : 0, saltSecret : 0, password : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
/*
    try {

        friendsIn = await Friend.find({receiverId : req._id, status : 'ACCEPTED'}, {__v : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    console.log(friendsOut, friendsIn)
*/  
    return res.status(200).json({status : true, friends : friends});

};



