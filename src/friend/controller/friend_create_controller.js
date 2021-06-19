'use strict'

const mongoose = require('mongoose');

const Friend = mongoose.model('Friend');
const User = mongoose.model('User');

const create_validator = require('../validator/friend_create_validator');

exports.createFriend = async (req, res, next) => {
    let validParams;

    console.log(req.body.params)

    if(req.body.params){
        validParams = create_validator.createValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    const friend = new Friend(validParams);

    friend.senderId = req._id;
    friend.receiverId = req.body.params.receiverId

    let sender = await User.findOne({_id : friend.senderId});
    if (!sender){

        return res.status(400).json({status : false, message : "Error : User not found"})
    }

    friend.senderName = sender.firstName + " " + sender.lastName;

    let user;
    try {
        user = await User.findOne({_id : friend.receiverId});
    } catch (err){
        console.log("User findOne error :", err)

        return res.status(400).json({status : false, error : err, message : "Error : User not found"})
    }
        
    if (!user){

        return res.status(400).json({status : false, message : "Error : User not found"})
    }

    friend.receiverName = user.firstName + " " + user.lastName;

    let dbFriend;
    try {
        
        dbFriend = await Friend.findOne({senderId : friend.senderId, receiverId : friend.receiverId});
    } catch (err){

        return res.status(400).json({status : false, error : err, message : "Error : Friend not found"})
    }
    if(!dbFriend){
        try {
        
            dbFriend = await Friend.findOne({senderId : friend.receiverId, receiverId : friend.senderId});
        } catch (err){
    
            return res.status(400).json({status : false, error : err, message : "Error : Friend not found"})
        }
    }

    if (friend.receiverId == friend.senderId) {

        return res.status(400).json({status : false, message : "Error : Duplicate ID"})
    }

    if(dbFriend){
        if (dbFriend.status == "WAITING" || dbFriend.status == "ACCEPTED"){
    
            return res.status(500).json({status : true, message : `Already created => status ${dbFriend.status}`, id : dbFriend._id})
        }
    
        if(dbFriend.status == "DECLINED" || dbFriend.status == "CANCEL"){
    
            let updateFriend;
            try {
                updateFriend = await Friend.findOneAndUpdate({_id :dbFriend._id, $or: [{ senderId: req._id }, { receiverId: req._id }]}, { $set: {status : "WAITING", senderId: friend.senderId, senderName : friend.senderName, receiverId : friend.receiverId, receiverName : friend.receiverName, modificationDatetime : Date.now()} }, {useFindAndModify : false});
            } catch (err){

                console.log(err)

                return res.status(400).json({status : false, error : err, message : "Error : Friend not created"})
            }
    
            if(updateFriend){
                return res.status(200).json({status : true, message : 'Friend updated'})
            }
        }
    }

    let doc;
    try {
        doc = await friend.save();

    } catch (err){

        return res.status(400).json({status : false, error : err, message : "Error : Friend not created"})
    };

    if (!doc){

        return res.status(400).json({status : false, message : "Error : Friend not created"})
    }

    res.status(200).json({status : true, message : 'Friend created', id : doc._id})
    
}