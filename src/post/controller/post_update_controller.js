'use strict'

const mongoose = require('mongoose')
const Post = mongoose.model('Post')

const updateValidator = require('../validator/post_update_validator');

exports.updatePost = (req, res, next) => {

    let validParams;

    if(req.body.params){
        validParams = updateValidator.updateValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(!validParams){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    req._id = "123"

    Post.findOneAndUpdate({_id : req.body._id, author_id : req._id}, { $set: validParams }, (err, post) => {
        if (!err) {
            res.status(200).json({status : true, message : 'Post updated', id : post._id})
        } else {
            return res.status(404).json({status : false, message : `Error updating post => ${err}`});
        }
    });

};