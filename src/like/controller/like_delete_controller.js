'use strict'

const mongoose = require('mongoose');

const Like = mongoose.model('Like');

exports.deleteLike = async (req, res, next) => {
    
    if(!req.body.postId){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    let like;
    try {
        like = await Like.findOne({postId : req.body.postId, userId : req._id});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!like){
        return res.status(400).json({status : false, message : 'Like not found.'});
    }

    let likeDelete;
    try {
        likeDelete = await Like.deleteOne({_id : like._id});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    
    if(likeDelete.deletedCount == 0){
        
        return res.status(400).json({status : false, message : 'Error deleting like'});
    }

    res.status(200).json({status : true, message : 'Like deleted'})

}