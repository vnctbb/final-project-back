'use strict'

const mongoose = require('mongoose')
const Topic = mongoose.model('Topic')

const updateValidator = require('../validator/topic_update_validator');

exports.updateTopic = async (req, res, next) => {

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

    if(!req.body._id){

        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    let topic = await Topic.findOneAndUpdate({_id : req.body._id, ownerId : req._id}, { $set: validParams }, {useFindAndModify : false});
    if (!topic){

        return res.status(404).json({status : false, message : `Error : Topic not found`});
    }

    res.status(200).json({status : true, message : 'Topic updated', id : validParams._id})

};