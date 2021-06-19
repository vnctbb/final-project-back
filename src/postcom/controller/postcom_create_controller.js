'use strict'

const mongoose = require('mongoose')

const Post = mongoose.model('Post');
const User = mongoose.model('User');
const PostCom = mongoose.model('PostCom');

exports.createPostCom = async (req, res, next) => {
    const postcom = new PostCom(req.body.params);
    
    postcom.authorId = req._id;
    postcom.modificationDatetime = postcom.creationDatetime;
    let user;
    try {
        user = await User.findOne({_id : req._id});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    postcom.authorName = user.firstName + " " + user.lastName;

    let post;
    try {
        post = await Post.findOne({_id : postcom.postId});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    if (!post){

        return res.status(400).json({status : false, message : "Error : Post not found"});
    }

    let doc;
    try {
        doc = await postcom.save();
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    
    if (!doc){
        return res.status(400).json({status : false, message : "Error : PostCom not created"});
    }

    res.status(200).json({status : true, message : 'PostCom created', doc : doc})
}