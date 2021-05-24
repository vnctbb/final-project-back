'use strict'

const mongoose = require('mongoose');
const TopicMessage = mongoose.model('TopicMessage')

exports.deleteTopicMessage = (req, res, next) => {

    if(!req.body.topicmessage_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    req._id = "60a7729837b47452b8c5483e"

    TopicMessage.findOne({_id : req.body.topicmessage_id, author_id : req._id}, (err, topicmessage) => {
        if(topicmessage){
            TopicMessage.deleteOne({_id : req.body.topicmessage_id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'TopicMessage deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'TopicMessage not found.'});
            }
        }
    })

};

exports.deleteTopicMessageAdmin = (req, res, next) => {

    if(!req.body.topicmessage_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    TopicMessage.findOne({_id : req.body.topicmessage_id}, (err, user) => {
        if(user){
            TopicMessage.deleteOne({_id : req.body.topicmessage_id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'TopicMessage deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'TopicMessage not found.'});
            }
        }
    })

};