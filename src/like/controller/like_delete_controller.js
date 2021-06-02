'use strict'

const mongoose = require('mongoose');

const Like = mongoose.model('Like');

exports.deleteLike = async (req, res, next) => {
    
    if(!req.body.like_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    req._id = "60ae71dbd5143b9e0bf3e9b6"

    let like;
    try {
        like = await Like.findOne({_id : req.body.like_id, user_id : req._id});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }

    if (!like){

        return res.status(400).json({status : false, message : 'Like not found.'});
    }

    let likeDelete;
    try {
        likeDelete = await Like.deleteOne({_id : req.body.like_id});
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    
    if(likeDelete.deletedCount == 0){
        
        return res.status(400).json({status : false, message : 'Error deleting like'});
    }

    res.status(200).json({status : true, message : 'Like deleted'})

}