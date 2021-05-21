'use strict'

const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.deletePost = (req, res, next) => {

    req._id = "60a7729837b47452b8c5483e"

    Post.findOne({_id : req.body._id, author_id : req._id}, (err, user) => {
        if(user){
            Post.deleteOne({_id : req.body._id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'Post deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'Post not found.'});
            }
        }
    })

};

exports.deletePostAdmin = (req, res, next) => {

    Post.findOne({_id : req.body._id}, (err, user) => {
        if(user){
            Post.deleteOne({_id : req.body._id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'Post deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'Post not found.'});
            }
        }
    })

};