'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Friend = mongoose.model('Friend');
const Post = mongoose.model('Post');
const PostCom = mongoose.model('PostCom');

const option_validator = require('../../validator/list_option_validator');

exports.findOne = async (req, res, next) => {

    if(!req.body.postcomId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let postCom;
    try {
        postCom = await  PostCom.findOne({_id : req.body.postcomId}, {__v : 0});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!postCom){

        return res.status(400).json({status : false, message : "Error : PostCom not found"});
    }

    return res.status(200).json({status : true, postCom : postCom});

};

exports.listByPostID = async (req, res, next) => {

    let optionV = {};
    let userId;

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }
    
    if(!req.body.params.postId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let postComLength = await PostCom.count({postId : req.body.params.postId});

    if(req.body.params.userId || req.body.params.userId != req._id){
        if(req.body.params.userId != req._id){
            let friend = await Friend.findOne({senderId : req._id, receiverId : req.body.params.userId});
            if (!friend){
                let friend = await Friend.findOne({senderId : req.body.params.userId, receiverId : req._id});
                if(!friend){
                    return res.status(400).json({status : false, message : "Error : Friendship not found"});
                }
            }
            userId = req.body.params.userId;
        } else {
            userId = req._id
        }
    } else {
        userId = req._id
    }

    console.log(userId)

    let post;
    try {
        post = await Post.findOne({_id : req.body.params.postId, authorId : userId}, {__v : 0});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!post){

        return res.status(400).json({status : false, message : "Error : Post not found"});
    }

    let postComs;
    try {
        postComs = await PostCom.find({postId : req.body.params.postId}, {__v : 0, postId : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    if (postComs.length == 0){

        return res.status(200).json({status : false, postcoms : []});
    }

    return res.status(200).json({status : true, postcoms : postComs, postId : req.body.params.postId, count : postComLength, authorId : post.authorId});

};

exports.listByAuthorID = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if (!req.body.params.authorId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let author;
    try {
        author = await User.findOne({_id : req.body.params.authorId}, {__v : 0});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!author){

        return res.status(400).json({status : false, message : "Error : Author not found"});
    }

    let postComs;
    try {
        postComs = await PostCom.find({author_id : req.body.params.authorId}, {__v : 0, author_id : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    
    if (postComs.length == 0){

        return res.status(400).json({status : false, message : "Error : PostComs not found"});
    }

    return res.status(200).json({status : true, postcoms : postComs, authorId : req.body.params.authorId});
};

exports.adminList = async (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }
    
    if(!req.body.params.postId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let postComs;
    try {
        postComs = await PostCom.find({postId : req.body.params.postId}, {__v : 0, postId : 0}, optionV);
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    if (postComs.length == 0){

        return res.status(200).json({status : false, postcoms : []});
    }

    return res.status(200).json({status : true, postcoms : postComs});

}

