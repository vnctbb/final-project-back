'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const PostCom = mongoose.model('PostCom');
const Topic = mongoose.model('Topic');
const TopicMessage = mongoose.model('TopicMessage');
const Like = mongoose.model('Like');

const update_validator = require('../validator/user_update_validator');

exports.updateProfile = async (req, res, next) => {

    let validParams;

    if(req.body){
        validParams = update_validator.updateValidator(req.body);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(validParams == {}){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    const user = await User.findOneAndUpdate({_id : req.body._id}, { $set: validParams }, {password : 0, saltSecret : 0, __v : 0})
    if(!user){
        return res.status(404).json({status : false, message : `Error updating user => user not found`});
    }

    console.log(user)

    if(validParams.firstName || validParams.lastName){
        let validName;
        if(!validParams.firstName){
            validName = user.firstName + " " + validParams.lastName;
        } else {
            if(!validParams.lastName){
                validName = validParams.firstName + " " + user.lastName;
            } else {
                validName = validParams.firstName + " " + validParams.lastName;
            }
        }
        
        const post = await Post.updateMany({authorId : req._id}, {$set : {authorName : validName}})

        const postCom = await PostCom.updateMany({authorId : req._id}, {$set : {authorName : validName}})

        const topic = await Topic.updateMany({ownerId : req._id}, {$set : {ownerName : validName}})

        const topicMessage = await TopicMessage.updateMany({authorId : req._id}, {$set : {authorName : validName}})

        const like = await Post.updateMany({userId : req._id}, {$set : {userName : validName}})
    }
    
    res.status(200).json({status : true, message : 'User updated', id : user._id})

};

exports.setProfilPicture = async (req, res, next) => {

    if(!req.body.filename){
        return res.status(404).json({status : false, message : `Error updating user => Invalid parameters`});
    }

    User.findOneAndUpdate({_id : req._id}, { $set: {profilPicture : req.body.filename} }, (err, user) => {
        if (!err) {
            if(user){
                
                Post.updateMany({authorId : req._id}, {$set : {authorPicture : req.body.filename}}, (err, post => {
                    PostCom.updateMany({authorId : req._id}, {$set : {authorPicture : req.body.filename}})
                }))

                res.status(200).json({status : true, message : 'User updated', id : user._id})
                
            } else {
                return res.status(404).json({status : false, message : `Error updating user => user not found`});
            }
        } else {
            return res.status(404).json({status : false, message : `Error updating user => ${err}`});
        }
    });
};

exports.unsetProfilPicture = async (req, res, next) => {

    User.findOneAndUpdate({_id : req._id}, { $set: {profilPicture : null} }, (err, user) => {
        if (!err) {
            if(user){
                
                Post.updateMany({authorId : req._id}, {$set : {authorPicture : null}}, (err, post => {
                    PostCom.updateMany({authorId : req._id}, {$set : {authorPicture : null}})
                }))

                res.status(200).json({status : true, message : 'User updated', id : user._id})
            } else {
                return res.status(404).json({status : false, message : `Error updating user => user not found`});
            }
        } else {
            return res.status(404).json({status : false, message : `Error updating user => ${err}`});
        }
    });
};