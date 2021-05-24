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

    req._id = "60aa18e2757e300587169a14";

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