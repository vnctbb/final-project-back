'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const PostCom = mongoose.model('PostCom');

const option_validator = require('../validator/list_params_validator');

exports.findPostCom = (req, res, next) => {

    if(!req.body.postcom_id){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    PostCom.findOne({_id : req.body.postcom_id}, {__v : 0}, (err, postcom) => {
        if(postcom){
            if(!err){
                return res.status(200).json({status : true, postcom : postcom});
            } else {
                return next(err);
            }
        } else {
            return res.status(400).json({status : false, message : "Error : PostCom not found"});
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
                PostCom.find({post_id : req.body.post_id}, {__v : 0, post_id : 0}, (err, coms) => {
                    if(coms.len == 0){
                        return res.status(400).json({status : false, message : "Error : PostComs not found"});
                    } else {
                        return res.status(200).json({status : true, postcoms : coms, post_id : req.body.post_id});
                    }
                });
            } else {
                return res.status(400).json({status : false, message : "Error : Author not found"});
            }
        });
    } else {
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }
};

exports.findListByAuthorID = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(req.body.author_id){
        User.findOne({_id : req.body.author_id}, {__v : 0}, optionV, (err, user) => {
            if(user){
                PostCom.find({author_id : req.body.author_id}, {__v : 0, author_id : 0}, (err, coms) => {
                    if(coms.len == 0){
                        return res.status(400).json({status : false, message : "Error : PostComs not found"});
                    } else {
                        return res.status(200).json({status : true, postcoms : coms, author_id : req.body.author_id});
                    }
                });
            } else {
                return res.status(400).json({status : false, message : "Error : Author not found"});
            }
        });
    } else {
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }
};

