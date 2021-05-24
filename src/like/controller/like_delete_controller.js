'use strict'

const mongoose = require('mongoose');

const Like = mongoose.model('Like');

exports.deleteLike = (req, res, next) => {
    
    if(!req.body.like_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    req._id = "60aa1871098a180559a335df"

    Like.findOne({_id : req.body.like_id, user_id : req._id}, (err, like) => {
        if(like){
            Like.deleteOne({_id : req.body.like_id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'Like deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'Like not found.'});
            }
        }
    })
}