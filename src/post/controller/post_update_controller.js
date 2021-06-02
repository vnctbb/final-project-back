'use strict'

const mongoose = require('mongoose')
const Post = mongoose.model('Post')

const updateValidator = require('../validator/post_update_validator');

exports.updatePost = async (req, res, next) => {

    let validParams;

    if (req.body.params){
        validParams = updateValidator.updateValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if (!validParams){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    req._id = "60ae71dbd5143b9e0bf3e9b6"
    
    if (!req.body.post_id){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    let post;
    try {
        post = await Post.findOneAndUpdate({_id : req.body.postId, authorId : req._id}, { $set: validParams }, {useFindAndModify : false});
    } catch (err) {

        return res.status(404).json({status : false, error : err});
    }
    
    if(!post){

        return res.status(404).json({status : false, message : `Error : Post not found`});
    }

    res.status(200).json({status : true, message : 'Post updated', id : post._id})

};