'use strict'

const mongoose = require('mongoose')
const PostCom = mongoose.model('PostCom')

const updateValidator = require('../validator/postcom_update_validator');

exports.updatePostCom = (req, res, next) => {

    let validParams;

    if(req.body.params){
        validParams = updateValidator.updateValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(!validParams){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    req._id = "60a7729837b47452b8c5483e"

    if(req.body.id){
        PostCom.findOneAndUpdate({_id : req.body._id, author_id : req._id}, { $set: validParams }, (err, com) => {
            if(com){
                if (!err) {
                    res.status(200).json({status : true, message : 'PostCom updated', id : validParams._id})
                } else {
                    return res.status(404).json({status : false, message : `Error updating PostCom => ${err}`});
                }
            } else {
                return res.status(404).json({status : false, message : `Error : PostCom not found`});
            }
        });
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

};