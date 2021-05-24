'use strict'

const mongoose = require('mongoose')
const Topic = mongoose.model('Topic')

const updateValidator = require('../validator/topic_update_validator');

exports.updateTopic = (req, res, next) => {

    let validParams;

    if(req.body.params){
        validParams = updateValidator.updateValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(!validParams){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    req._id = "60a7729837b47452b8c5483e"

    Topic.findOneAndUpdate({_id : validParams._id, owner_id : req._id}, { $set: validParams }, (err, topic) => {
        if(topic){
            if (!err) {
                res.status(200).json({status : true, message : 'Topic updated', id : validParams._id})
            } else {
                return res.status(404).json({status : false, message : `Error updating post => ${err}`});
            }
        } else {
            return res.status(404).json({status : false, message : `Error : Topic not found`});
        }
    });

};