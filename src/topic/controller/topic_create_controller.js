'use strict'

const mongoose = require('mongoose')

const Topic = mongoose.model('Topic')
const User = mongoose.model('User')

exports.createTopic = async (req, res, next) => {

    const topic = new Topic(req.body.params);

    topic.ownerId = req._id;
    topic.modificationDatetime = topic.creationDatetime;

    let user = await User.findOne({_id : req._id});
    if(user){
        topic.ownerName = user.firstName + " " + user.lastName;
    } else {

        res.status(400).json({status : true, message : 'Error : User not found'})
    }

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