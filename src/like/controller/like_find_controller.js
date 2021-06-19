'use strict'

const mongoose = require('mongoose');
const Like = mongoose.model('Like');
const Post = mongoose.model('Post');

const option_validator = require('../validator/list_params_validator');

exports.exist = (req, res, next) => {
    if(!req.body.postId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    Like.findOne({postId : req.body.postId, userId : req._id}, {__v : 0}, (err, like) => {
        if(like){
            if(!err){
                return res.status(200).json({status : true, exist : true});
            } else {
                return next(err);
            }
        } else {
            return res.status(200).json({true : false, exist : false});
        }
    });
}

exports.findLike = (req, res, next) => {

    if(!req.body.likeId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    Like.findOne({_id : req.body.likeId}, {__v : 0}, (err, like) => {
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

exports.findListByPostID = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if (!req.body.params.postId){

        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let post;
    try {
        post = await Post.findOne({_id : req.body.params.postId}, {__v : 0});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!post){

        return res.status(400).json({status : false, message : "Error : Post not found"});
    }

    let likes;
    try {
        likes = await Like.find({postId : req.body.params.postId}, {__v : 0, postId : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (likes.length == 0){

        return res.status(400).json({status : false, message : "Error : Likes not found"});
    }

    return res.status(200).json({status : true, likes : likes});

};