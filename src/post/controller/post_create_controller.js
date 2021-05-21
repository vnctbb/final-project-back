'use strict'

const mongoose = require('mongoose');

const Post = mongoose.model('Post');

exports.createPost = (req, res, next) => {
    const post = new Post(req.body.params);

    //
    req._id = "60a7729837b47452b8c5483e"

    post.author_id = req._id;
    post.modification_datetime = post.creation_datetime;

    post.save((err, doc) => {
        if(!err){
            res.status(200).json({status : true, message : 'Post created'})
        } else {
            return next(err)
        }
    })
}