'use strict'

const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const User = mongoose.model('User');
const Like = mongoose.model('Like');

exports.createLike = async (req, res, next) => {
    const like = new Like(req.body.params);

    like.userId = req._id;

    let user;
    try {

        user = await User.findOne({_id : req._id});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    let likeCheck;
    try {

        likeCheck = await Like.findOne({userId : req._id, postId : like.postId});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    if (likeCheck){

        return res.status(400).json({status : false, message: "Error : Post already liked", likeId : likeCheck._id});
    }

    like.userName = user.firstName + " " + user.lastName;

    console.log(like)

    let post; 
    try {

        post = await Post.findOne({_id : like.postId});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!post){

        return res.status(400).json({status : false, message : "Error : Post not found"});
    }

    let doc;
    try {
        doc = await like.save();
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    
    if (!doc){

        return res.status(400).json({status : false, message : "Error : Like not created"});
    }

    res.status(200).json({status : true, message : 'Like created', id : doc._id})

}