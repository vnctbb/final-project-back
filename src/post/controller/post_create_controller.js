'use strict'

const mongoose = require('mongoose');

const Post = mongoose.model('Post');

exports.createPost = (req, res, next) => {
    const post = new Post(req.body.params);

    //
    req._id = "60ae71dbd5143b9e0bf3e9b6"

    post.authorId = req._id;
    post.modificationDatetime = post.creationDatetime;

    post.save((err, doc) => {
        if(!err){
            res.status(200).json({status : true, message : 'Post created', id : doc._id})
        } else {
            return next(err)
        }
    })
}