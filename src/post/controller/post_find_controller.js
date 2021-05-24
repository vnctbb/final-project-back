'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

const option_validator = ('../validator/list_params_validator');


exports.findOneById = (req, res, next) => {

    if(!req.body.post_id){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    Post.findOne({_id : req.body.post_id}, {__v : 0}, (err, post) => {
        if(post){
            if(!err){
                return res.status(200).json({status : true, post : post});
            } else {
                return next(err);
            }
        } else {
            return res.status(400).json({status : false, message : "Error : Post not found"});
        }
    });

};

exports.findList = (req, res, next) => {

    let filter = {};

    let optionV;

    if(req.body.params){

        if(req.body.params.authors_list){
            filter = {
                author_id : req.body.params.authors_list
            }
        }

        optionV = option_validator.optionValidator(req.body.params);
    }

    Post.find(filter, {__v : 0}, optionV, (err, posts) => {
        if(posts.len == 0){
            return res.status(400).json({status : false, message : "Error : Post not found"});
        } else {
            if(!err){
                return res.status(200).json({status : true, posts : posts});
            } else {
                return next(err);
            }
        }
    });

};

exports.findListByAuthorId = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(req.body.author_id){
        User.findOne({_id : req.body.params.author_id}, {__v : 0}, optionV, (err, user) => {
            if(user){
                if(!err){
                    Post.find({author_id : req.body.params.author_id}, {__v : 0, author_id : 0}, (err, posts) => {
                        if(posts.len == 0){
                            return res.status(400).json({status : false, message : "Error : Posts not found"});
                        } else {
                            if(!err){
                                return res.status(200).json({status : true, posts : posts});
                            } else {
                                return next(err);
                            }
                        }
                    });
                } else {
                    return next(err);
                }
            } else {
                return res.status(400).json({status : false, message : "Error : Author not found"});
            }
        });
    } else {
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }
};

