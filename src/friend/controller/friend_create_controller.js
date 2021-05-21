'use strict'

const mongoose = require('mongoose');

const Friend = mongoose.model('Friend');

exports.createFriend = (req, res, next) => {
    const friend = new Friend(req.body.params);

    req._id = "60a7729837b47452b8c5483e";

    friend.sender_id = req._id;

    Friend.findOne({sender_id : friend.sender_id, receiver_id : friend.receiver_id, status : ["WAITING", "ACCEPTED"]}, (err, friend) => {
        if(friend){
            res.status(500).json({status : true, message : `Already created => status ${friend.status}`})
        } else {
            friend.save((err, doc) => {
                if(!err){
                    res.status(200).json({status : true, message : 'Friend created'})
                } else {
                    return next(err)
                }
            })
        } 
    })
}