'use strict'

const mongoose = require('mongoose')
const PostCom = mongoose.model('PostCom')

const updateValidator = require('../validator/postcom_update_validator');

exports.updatePostCom = async (req, res, next) => {

    let validParams;

    if(req.body.params){
        validParams = updateValidator.updateValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(!validParams){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    req._id = "60ae71dbd5143b9e0bf3e9b6"

    if (!req.body._id){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    let postCom;
    try {
        postCom = await PostCom.findOneAndUpdate({_id : req.body._id, authorId : req._id}, { $set: validParams }, {useFindAndModify : false})
    } catch (err) {

        return res.status(400).json({status : false, error : err});
    }
    
    if (!postCom){
        return res.status(404).json({status : false, message : `Error updating PostCom`}); 
    }

    res.status(200).json({status : true, message : 'PostCom updated', id : req.body._id})

};