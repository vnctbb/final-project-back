'use strict'

const mongoose = require('mongoose');
const PostCom = mongoose.model('PostCom')
const Post = mongoose.model('Post')

exports.deletePostCom = async (req, res, next) => {

    if(!req.body.postcomId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    let postCom = await PostCom.findOne({_id : req.body.postcomId, authorId : req._id});
    if (!postCom){

        return res.status(404).json({status : false, message : 'PostCom not found.'});
    }

    let postComDelete = await PostCom.deleteOne({_id : req.body.postcomId});
    if(!postComDelete.deletedCount || postComDelete.deletedCount == 0) {

        return res.status(404).json({status : false, message : 'Error deleting postCom'});
    } 
        
    res.status(200).json({status : true, message : 'PostCom deleted'})

};

exports.authorDeletePostCom = async (req, res, next) => {

    if(!req.body.postcomId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    let postCom = await PostCom.findOne({_id : req.body.postcomId});
    if (!postCom){

        return res.status(404).json({status : false, message : 'PostCom not found.'});
    }

    let post = await Post.findOne({_id : postCom.postId})
    if(post){
        if(post.authorId != req._id){
            return res.status(404).json({status : false, message : 'Id doesn\'t match.'});
        }
    } else {
        return res.status(404).json({status : false, message : 'Post not found.'});
    }

    let postComDelete = await PostCom.deleteOne({_id : req.body.postcomId});
    if(!postComDelete.deletedCount || postComDelete.deletedCount == 0) {

        return res.status(404).json({status : false, message : 'Error deleting postCom'});
    } 
        
    res.status(200).json({status : true, message : 'PostCom deleted'})

};

exports.deletePostComAdmin = async (req, res, next) => {

    if(!req.body.postcomId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    req._id = "60ae71dbd5143b9e0bf3e9b6"

    let postCom = await PostCom.findOne({_id : req.body.postcomId});
    if (!postCom){

        return res.status(404).json({status : false, message : 'PostCom not found.'});
    }

    let postComDelete = await PostCom.deleteOne({_id : req.body.postcomId});
    if(postComDelete.deletedCount == 0) {

        return res.status(404).json({status : false, message : 'Error deleting postCom'});
    } 
        
    res.status(200).json({status : true, message : 'PostCom deleted'})

};