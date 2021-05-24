'use strict'

const mongoose = require('mongoose')

const TopicMessage = mongoose.model('TopicMessage')

exports.createTopicMessage = (req, res, next) => {
    const topicmessage = new TopicMessage(req.body.params);
    
    req._id = "60a7729837b47452b8c5483e"

    topicmessage.author_id = req._id;
    topicmessage.modification_datetime = topicmessage.creation_datetime;

    topicmessage.save((err, doc) => {
        if(!err){
            res.status(200).json({status : true, message : 'TopicMessage created', id : doc._id})
        } else {
            return next(err)
        }
    })
}