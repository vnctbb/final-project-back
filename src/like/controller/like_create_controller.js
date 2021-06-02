'use strict'

const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Like = mongoose.model('Like');

exports.createLike = async (req, res, next) => {
    const like = new Like(req.body.params);
    req._id = "60ae71dbd5143b9e0bf3e9b6";

    like.userId = req._id;

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