'use strict'

const mongoose = require('mongoose')

const Topic = mongoose.model('Topic')
const User = mongoose.model('User');
const TopicMessage = mongoose.model('TopicMessage')

exports.createTopicMessage =  async(req, res, next) => {
    const topicmessage = new TopicMessage(req.body.params);

    topicmessage.authorId = req._id;
    topicmessage.modification_datetime = topicmessage.creationDatetime;

    let user = await User.findOne({_id : req._id});
    if(user){
        topicmessage.authorName = user.firstName + " " + user.lastName;
    }

    console.log(topicmessage.topicId)

    let topic = await Topic.findOne({_id : topicmessage.topicId});
    if (!topic){
        
        res.status(400).json({status : false, message : 'Error : Topic not found'})
    }

    let doc = await topicmessage.save();
    if (!doc){

        res.status(400).json({status : false, message : 'Error : TopicMessage not created'})
    }

    res.status(200).json({status : true, message : 'TopicMessage created', id : doc._id})

}