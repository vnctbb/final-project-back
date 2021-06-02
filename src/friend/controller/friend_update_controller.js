'use strict'

const mongoose = require('mongoose');
const Friend = mongoose.model('Friend');

const update_validator = require('../validator/friend_update_params');

exports.updateFriend = (req, res, next) => {

    let validParams;

    if(req.body.params){
        validParams = update_validator.updateValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(!validParams){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    req._id = "60b68d88a9ff4a38f0fca08f";

    if (!req.body.friendId){

        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    try {
        Friend.findOneAndUpdate({_id : req.body.friendId, receiverId : req._id}, { $set: validParams }, {useFindAndModify : false}, (err, user) => {
            if(user){
                res.status(200).json({status : true, message : 'Friend updated'})
            } else {
                return res.status(404).json({status : false, message : `Error updating friend => friend not found`});
            }
        });
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

};