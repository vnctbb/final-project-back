'use strict'

const mongoose = require('mongoose')

const PostCom = mongoose.model('PostCom')

exports.createPostCom = (req, res, next) => {
    const postcom = new PostCom(req.body.params);
    
    req._id = "60a7729837b47452b8c5483e"

    postcom.author_id = req._id;
    postcom.modification_datetime = postcom.creation_datetime;

    postcom.save((err, doc) => {
        if(!err){
            res.status(200).json({status : true, message : 'PostCom created', id : doc._id})
        } else {
            return next(err)
        }
    })
}