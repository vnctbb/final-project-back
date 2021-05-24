'use strict'

const mongoose = require('mongoose')
const Topic = mongoose.model('Topic')

exports.deleteTopic = (req, res, next) => {

    if(!req.body.topic_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    req._id = "60a7729837b47452b8c5483e"

    Topic.findOne({_id : req.body.topic_id, owner_id : req._id}, (err, user) => {
        if(user){
            Topic.deleteOne({_id : req.body.topic_id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'Topic deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'Topic not found.'});
            }
        }
    })

};

exports.deleteTopicAdmin = (req, res, next) => {

    if(!req.body.topic_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    Topic.findOne({_id : req.body.topic_id}, (err, user) => {
        if(user){
            Topic.deleteOne({_id : req.body.topic_id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'Topic deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'Topic not found.'});
            }
        }
    })

};