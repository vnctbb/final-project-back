'use strict'

const mongoose = require('mongoose')

const Topic = mongoose.model('Topic')

exports.createTopic = (req, res, next) => {
    const topic = new Topic(req.body.params);
    
    req._id = "60a7729837b47452b8c5483e"

    topic.owner_id = req._id;
    topic.modification_datetime = topic.creation_datetime;

    topic.save((err, doc) => {
        if(!err){
            res.status(200).json({status : true, message : 'Topic created', id : doc._id})
        } else {
            return next(err)
        }
    })
}