'use strict'

const mongoose = require('mongoose')
const Topic = mongoose.model('Topic')
const TopicMessage = mongoose.model('TopicMessage')

exports.deleteTopic = async (req, res, next) => {

    if(!req.body.topicId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    let topic = await Topic.findOne({_id : req.body.topicId, ownerId : req._id});
    if (!topic){

        return res.status(404).json({status : false, message : 'Topic not found.'});
    }

    let topicDelete = await Topic.deleteOne({_id : req.body.topicId});
    if(topicDelete.deletedCount == 0) {
        return res.status(404).json({status : false, message : 'Error deleting post'});
    }

    let topicMessage = await TopicMessage.findOne({topicId : req.body.topicId, ownerId : req._id});
    if (topicMessage){

        let topicMessageDelete = await TopicMessage.deleteMany({topicId: req.body.topicId});
        if(topicMessageDelete.deletedCount == 0){

            return res.status(404).json({status : false, message : 'Error deleting TopicMessage'});
        } 
    }

    res.status(200).json({status : true, message : 'Topic deleted'})

};

exports.deleteTopicAdmin = async (req, res, next) => {

    if(!req.body.topicId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    let topic = await Topic.findOne({_id : req.body.topicId});
    if (!topic){

        return res.status(404).json({status : false, message : 'Topic not found.'});
    }

    let topicDelete = await Topic.deleteOne({_id : req.body.topicId});
    if(topicDelete.deletedCount == 0) {
        return res.status(404).json({status : false, message : 'Error deleting post'});
    }

    let topicMessage = await TopicMessage.findOne({topicId : req.body.topicId});
    if (topicMessage){

        let topicMessageDelete = await TopicMessage.deleteMany({topicId: req.body.topicId});
        if(topicMessageDelete.deletedCount == 0){

            return res.status(404).json({status : false, message : 'Error deleting TopicMessage'});
        } 
    }

    res.status(200).json({status : true, message : 'Topic deleted'})

};