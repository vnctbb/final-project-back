'use strict'

const mongoose = require('mongoose');
const Friend = mongoose.model('Friend');

const update_request_params = require('../request/friend_update_params');

exports.updateFriend = (req, res, next) => {

    let validParams;

    if(req.body.params){
        validParams = update_request_params.friendUpdateParams(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    req._id = "60a7d6b18669dd7188ec6093";

    Friend.findOneAndUpdate({_id : req.body._id, receiver_id : req._id}, { $set: validParams }, (err, user) => {
        if (!err) {
            if(user){
                res.status(200).json({status : true, message : 'Friend updated'})
            } else {
                return res.status(404).json({status : false, message : `Error updating friend => friend not found`});
            }
        } else {
            return res.status(404).json({status : false, message : `Error updating friend => ${err}`});
        }
    });

};