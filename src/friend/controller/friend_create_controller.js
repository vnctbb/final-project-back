'use strict'

const mongoose = require('mongoose');

const Friend = mongoose.model('Friend');
const User = mongoose.model('User');

const create_validator = require('../validator/friend_create_validator');

exports.createFriend = (req, res, next) => {
    let validParams;

    if(req.body.params){
        validParams = create_validator.createValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    const friend = new Friend(validParams);
    req._id = "60aa1871098a180559a335df";

    friend.sender_id = req._id;

    User.findOne({_id : friend.receiver_id}, (err, user) => {
        if(user){
            Friend.findOne({sender_id : friend.sender_id, receiver_id : friend.receiver_id, status : ["WAITING", "ACCEPTED"]}, (err,  dbFriend) => {
                if(dbFriend){
                    res.status(500).json({status : true, message : `Already created => status ${dbFriend.status}`, id : dbFriend._id})
                } else {
                    friend.save((err, doc) => {
                        if(!err){
                            res.status(200).json({status : true, message : 'Friend created', id : friend._id})
                        } else {
                            return next(err)
                        }
                    })
                } 
            })
        } else {
            return next(err);
        }
    })
}