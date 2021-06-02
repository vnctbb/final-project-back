'use strict'

const mongoose = require('mongoose')

const Topic = mongoose.model('Topic')

exports.createTopic = async (req, res, next) => {
    const topic = new Topic(req.body.params);
    
    req._id = "60b4b6bd911e0e0a18af7877"

    topic.ownerId = req._id;
    topic.modificationDatetime = topic.creationDatetime;

    let doc;
    try {
        doc = await topic.save();
    } catch (err) {

        res.status(400).json({status : true, error : err})
    }

    if (!doc){

        res.status(400).json({status : true, message : 'Error : Topic not created'})
    }

    res.status(200).json({status : true, message : 'Topic created', id : doc._id})
    
}