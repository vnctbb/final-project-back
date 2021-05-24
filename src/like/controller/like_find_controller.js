'use strict'

const mongoose = require('mongoose');
const Like = mongoose.model('Like');
const Post = mongoose.model('Post');

const option_validator = require('../validator/list_params_validator');

exports.findLike = (req, res, next) => {

    if(!req.body.like_id){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    Like.findOne({_id : req.body.like_id}, {__v : 0}, (err, like) => {
        if(like){
            if(!err){
                return res.status(200).json({status : true, like : like});
            } else {
                return next(err);
            }
        } else {
            return res.status(400).json({status : false, message : "Error : Like not found"});
        }
    });

};

exports.findListByPostID = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(req.body.post_id){
        Post.findOne({_id : req.body.post_id}, {__v : 0}, optionV, (err, post) => {
            if(post){
                Like.find({post_id : req.body.post_id}, {__v : 0, post_id : 0}, (err, likes) => {
                    if(likes.len == 0){
                        return res.status(400).json({status : false, message : "Error : Likes not found"});
                    } else {
                        if(!err){
                            return res.status(200).json({status : true, likes : likes});
                        } else {
                            return next(err);
                        }
                    }
                });
            } else {
                return res.status(400).json({status : false, message : "Error : Post not found"});
            }
        });
    } else {
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }
};