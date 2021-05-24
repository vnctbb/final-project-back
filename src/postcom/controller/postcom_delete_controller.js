'use strict'

const mongoose = require('mongoose');
const PostCom = mongoose.model('PostCom')

exports.deletePostCom = (req, res, next) => {

    if(!req.body.postcom_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    req._id = "60a7729837b47452b8c5483e"

    PostCom.findOne({_id : req.body.postcom_id, author_id : req._id}, (err, postcom) => {
        if(postcom){
            PostCom.deleteOne({_id : req.body.postcom_id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'PostCom deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'PostCom not found.'});
            }
        }
    })

};

exports.deletePostComAdmin = (req, res, next) => {

    if(!req.body.postcom_id){
        return res.status(404).json({status : false, message : 'Invalid parameters.'});
    }

    PostCom.findOne({_id : req.body.postcom_id}, (err, user) => {
        if(user){
            PostCom.deleteOne({_id : req.body.postcom_id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'PostCom deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'PostCom not found.'});
            }
        }
    })

};