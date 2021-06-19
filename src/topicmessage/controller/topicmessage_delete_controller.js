'use strict'

const mongoose = require('mongoose');
const TopicMessage = mongoose.model('TopicMessage')

exports.deleteTopicMessage = async (req, res, next) => {

    if(!req.body.topicmessageId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    let topicmessage = await TopicMessage.findOne({_id : req.body.topicmessageId, authorId : req._id});
    if (!topicmessage){

        return res.status(404).json({status : false, message : 'TopicMessage not found.'});
    }

    let topicmessageDelete = await TopicMessage.deleteOne({_id : req.body.topicmessageId});
    if (topicmessageDelete.deletedCount == 0 || !topicmessageDelete.deletedCount){
        
        return res.status(404).json({status : false, message : 'Error deleting topicmessage'});
    } 

    console.log(topicmessageDelete.deletedCount)

    res.status(200).json({status : true, message : 'TopicMessage deleted'})

};

exports.deleteTopicMessageAdmin = async (req, res, next) => {

    if(!req.body.topicmessageId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    req._id = "60a7729837b47452b8c5483e"

    let topicmessage = await TopicMessage.findOne({_id : req.body.topicmessageId});
    if (!topicmessage){

        return res.status(404).json({status : false, message : 'TopicMessage not found.'});
    }

    let topicmessageDelete = await TopicMessage.deleteOne({_id : req.body.topicmessageId});
    if (topicmessageDelete.deletedCount == 0){
        
        return res.status(404).json({status : false, message : 'Error deleting topicmessage'});
    } 

    res.status(200).json({status : true, message : 'TopicMessage deleted'})

};