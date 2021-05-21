'use strict'

const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.updatePost = (req, res, next) => {

    req._id = "60a7729837b47452b8c5483e"

    Post.findOneAndUpdate({_id : req.body._id, author_id : req._id}, { $set: req.body.params }, (err, post) => {
        if (!err) {
            res.status(200).json({status : true, message : 'Post updated'})
        } else {
            return res.status(404).json({status : false, message : `Error updating post => ${err}`});
        }
    });

};