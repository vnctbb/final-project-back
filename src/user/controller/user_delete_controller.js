'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Post = mongoose.model('Post')
const PostCom = mongoose.model('PostCom')
const Like = mongoose.model('Like')
const Topic = mongoose.model('Topic')
const TopicMessage = mongoose.model('TopicMessage')
const Friend = mongoose.model('Friend')

exports.deleteUser = async (req, res, next) => {

    let userDelete;
    try {
        userDelete = await User.findOne({_id : req._id});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : User not found'})
    }

    try {
        userDelete = await User.deleteOne({_id : req._id});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : User not deleted'})
    }

    try {

        await deletePost(req._id)
    } catch (err){

        console.log(err)
    }

    try {

        await deleteTopic(req._id)
    } catch (err){

        console.log(err)
    }

    let friendDelete
    try {
        friendDelete = await Friend.deleteMany({$or: [{ receiverId: req._id }, { senderId: req_id }]});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Friend not delete'})
    }

    return res.status(200).json({status : true, message : 'User deleted'})

};

exports.deleteUserAdmin = async (req, res, next) => {

    let userDelete;
    try {
        userDelete = await User.findOne({_id : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : User not found'})
    }

    try {
        userDelete = await User.deleteOne({_id : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : User not deleted'})
    }

    try {

        await deletePost(req.body.params.userId)
    } catch (err){

        console.log(err)
    }

    try {

        await deleteTopic(req.body.params.userId)
    } catch (err){

        console.log(err)
    }

    let friendDelete
    try {
        friendDelete = await Friend.deleteMany({$or: [{ receiverId: req.body.params_id }, { senderId: req.body.params_id }]});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Friend not delete'})
    }

    return res.status(200).json({status : true, message : 'User deleted'})

};

async function deletePost(PostId){

    // retrive users posts
    let posts
    try {
        posts = await Post.find({authorId : PostId})
    } catch (err){
        console.log(err);
    }

    if(posts){
        // delete postCom related to user posts
        try {
            await PostCom.deleteMany({postId : posts});
        } catch (err) {
            console.log(err);
        }
    
        // delete like related to user posts
        try {
            await Like.deleteMany({postId : posts});
        } catch (err) {
            console.log(err);
        }
    }

    // delete users posts
    try {
        await Post.deleteMany({authorId : PostId});
    } catch (err) {
        console.log(err);
    }

    // delete users postCom
    try {
        await PostCom.deleteMany({authorId : PostId});
    } catch (err) {
        console.log(err);
    }

    // delete users like
    try {
        await Like.deleteMany({userId : PostId});
    } catch (err) {
        console.log(err);
    }

    return {response : true, err : undefined};
}

async function deleteTopic(PostId){

    // retrive users topics
    let topics
    try {
        topics = await Topic.find({ownerId : PostId})
    } catch (err){
        console.log(err);
    }

    if(topics){
        // delete topicMessage related to user topics
        try {
            await TopicMessage.deleteMany({topicId : topics});
        } catch (err) {
            console.log(err);
        }
    }

    // delete users topics
    try {
        await Topic.deleteMany({ownerId : PostId});
    } catch (err) {
        console.log(err);
        
    }

    // delete users topic message
    try {
        await TopicMessage.deleteMany({authorId : PostId});
    } catch (err) {
        console.log(err);
        
    }

    return {response : true, err : undefined};
}