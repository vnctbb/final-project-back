'use strict'

const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const PostCom = mongoose.model('Post');
const Like = mongoose.model('Like');

exports.deletePost = async (req, res, next) => {

    req._id = "60ae71dbd5143b9e0bf3e9b6"

    let post = await Post.findOne({_id : req.body.postId, authorId : req._id});
    if (!post) return res.status(404).json({status : false, message : 'Post not found.'});

    let postDelete = await Post.deleteOne({_id : req.body.postId});
    if(postDelete.deletedCount == 0) return res.status(404).json({status : false, message : 'Error deleting post'});

    let postCom = await PostCom.findOne({postId : req.body.postId, authorId : req._id});
    if (postCom){

        let postComDelete = await PostCom.deleteMany({postId: req.body.postId});
        if(postComDelete.deletedCount == 0) return res.status(404).json({status : false, message : 'Error deleting postCom'});
    }

    let like = await Like.findOne({postId : req.body.postId, authorId : req._id});
    if (like){

        let likeDelete = await Like.deleteMany({postId: req.body.postId});
        if(likeDelete.deletedCount == 0) return res.status(404).json({status : false, message : 'Error deleting like'});
    }

    res.status(200).json({status : true, message : 'Post deleted'})

};

exports.deletePostAdmin = async (req, res, next) => {

    let post = await Post.findOne({_id : req.body.postId});
    if (!post) return res.status(404).json({status : false, message : 'Post not found.'});

    let postDelete = await Post.deleteOne({_id : req.body.postId});
    if(postDelete.deletedCount == 0) return res.status(404).json({status : false, message : 'Error deleting post'});

    let postCom = await PostCom.findOne({postId : req.body.postId});
    if (postCom){

        let postComDelete = await PostCom.deleteMany({postId: req.body.postId});
        if(postComDelete.deletedCount == 0) return res.status(404).json({status : false, message : 'Error deleting postCom'});
    }

    let like = await Like.findOne({postId : req.body.postId});
    if (like){

        let likeDelete = await Like.deleteMany({postId: req.body.postId});
        if(likeDelete.deletedCount == 0) return res.status(404).json({status : false, message : 'Error deleting like'});
    }

    res.status(200).json({status : true, message : 'Post deleted'})

};