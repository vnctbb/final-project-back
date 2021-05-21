'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

const option_validator = ('../validator/list_params_validator');


exports.findOneById = (req, res, next) => {

    Post.findOne({_id : req.body._id}, {__v : 0}, (err, post) => {
        if(!err){
            res.json(post);
        } else {
            return next(err);
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
        if(!err){
            return res.status(200).json({status : true, posts : posts});
        } else {
            return next(err);
        }
    });

};

exports.findListByAuthorId = (req, res, next) => {

    const optionV = option_validator.optionValidator(req.body.params);

    User.findOne({_id : req.body.params.author_id}, {__v : 0}, optionV, (err, user) => {
        if(!err){
            Post.find({author_id : req.body.params.author_id}, {__v : 0, author_id : 0}, (err, posts) => {
                if(!err){
                    return res.status(200).json({status : true, posts : posts, author_id : req.body.params.author_id});
                } else {
                    return next(err)
                }
            });
        } else {
            return next(err);
        }
    });
};

