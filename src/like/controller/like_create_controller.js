'use strict'

const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Like = mongoose.model('Like');

exports.createLike = (req, res, next) => {
    const like = new Like(req.body.params);
    req._id = "60aa1871098a180559a335df";

    like.user_id = req._id;

    Post.findOne({_id : like.post_id}, (err, post) => {
        if(post){
            like.save((err, doc) => {
                if(!err){
                    res.status(200).json({status : true, message : 'Like created', id : doc._id})
                } else {
                    return next(err)
                }
            })
        } else {
            return res.status(400).json({status : false, message : "Error : Post not found"});
        }
    })
}