'use strict'

const mongoose = require('mongoose');

const Friend = mongoose.model('Friend');
const User = mongoose.model('User');

const create_validator = require('../validator/friend_create_validator');

exports.createFriend = async (req, res, next) => {
    let validParams;

    if(req.body.params){
        validParams = create_validator.createValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    const friend = new Friend(validParams);
    req._id = "60b4ba2c4d69620b8b3e7217";

    friend.senderId = req._id;

    let user;
    try {
        user = await User.findOne({_id : friend.receiverId});
    } catch (err){
        console.log("User findOne error :", err)

        res.status(400).json({status : false, error : err, message : "Error : User not found"})
    }
        
    if (!user){

        res.status(400).json({status : false, message : "Error : User not found"})
    }

    let dbFriend;
    try {
        
        dbFriend = await Friend.findOne({senderId : friend.senderId, receiverId : friend.receiverId});
    } catch (err){

        res.status(400).json({status : false, error : err, message : "Error : Friend not found"})
    }

    if(dbFriend){
        if (dbFriend.status == "WAITING" || dbFriend.status == "ACCEPTED"){
    
            res.status(500).json({status : true, message : `Already created => status ${dbFriend.status}`, id : dbFriend._id})
        }
    
        if(dbFriend.status == "REJECTED"){
    
            let friend;
            try {
                friend = await Friend.findOneAndUpdate({_id : req.body.friendId, receiverId : req._id}, { $set: validParams }, {useFindAndModify : false});
            } catch (err){

                res.status(400).json({status : false, error : err, message : "Error : Friend not created"})
            }
    
            if(friend){
                res.status(200).json({status : true, message : 'Friend updated'})
            }
        }
    }

    let doc;
    try {
        doc = await friend.save();

    } catch (err){

        res.status(400).json({status : false, error : err, message : "Error : Friend not created"})
    };

    if (!doc){

        res.status(400).json({status : false, message : "Error : Friend not created"})
    }

    res.status(200).json({status : true, message : 'Friend created', id : doc._id})
    
}