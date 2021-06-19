'use strict'

const mongoose = require('mongoose')
const TopicMessage = mongoose.model('TopicMessage')

const updateValidator = require('../validator/topicmessage_update_validator');

exports.updateTopicMessage = async (req, res, next) => {

    let validParams;

    if(req.body.params){
        validParams = updateValidator.updateValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(!validParams){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(!req.body._id){

        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    let topicmessage = await TopicMessage.findOneAndUpdate({_id : req.body._id, authorId : req._id}, { $set: validParams }, {useFindAndModify : false});
    if (!topicmessage){

        return res.status(404).json({status : false, message : `Error : TopicMessage not found`});
    }

    
    return res.status(200).json({status : true, message : 'TopicMessage updated', id : validParams._id})

};