'use strict'

const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.createPost = async (req, res, next) => {
    const post = new Post(req.body.params);

    post.authorId = req._id;
    post.modificationDatetime = post.creationDatetime;

    let user = await User.findOne({_id : req._id});
    if (!user){

        return res.status(400).json({status : false, message : "Error : Author not found"});
    }

    post.authorName = user.firstName + " " + user.lastName;

    post.save((err, doc) => {
        if(!err){
            res.status(200).json({status : true, message : 'Post created', id : doc._id})
        } else {
            return next(err)
        }
    })
}