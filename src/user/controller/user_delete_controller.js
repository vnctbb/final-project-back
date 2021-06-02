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

    let postDelete
    try {
        postDelete = await Post.deleteMany({authorId : req._id});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Post not deleted'})
    }

    let postComDelete
    try {
        postComDelete = await PostCom.deleteMany({authorId : req._id});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : UserCom not deleted'})
    }

    let likeDelete
    try {
        likeDelete = await Like.deleteMany({userId : req._id});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Like not delete'})
    }

    let topicDelete
    try {
        topicDelete = await Topic.deleteMany({ownerId : req._id});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Topic not delete'})
    }

    let topicMessageDelete
    try {
        topicMessageDelete = await TopicMessage.deleteMany({authorId : req._id});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : TopicMessage not deletes'})
    }

    let friendDelete
    try {
        friendDelete = await Friend.deleteMany({receiverId : req._id});
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

    let postDelete
    try {
        postDelete = await Post.deleteOne({authorId : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Post not deleted'})
    }

    let postComDelete
    try {
        postComDelete = await PostCom.deleteOne({authorId : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : UserCom not deleted'})
    }

    let likeDelete
    try {
        likeDelete = await Like.deleteOne({userId : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Like not deleted'})
    }

    let topicDelete
    try {
        topicDelete = await Topic.deleteOne({ownerId : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Topic not deleted'})
    }

    let topicMessageDelete
    try {
        topicMessageDelete = await TopicMessage.deleteOne({authorId : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : TopicMessage not deleted'})
    }

    let friendDelete
    try {
        friendDelete = await Friend.deleteOne({receiverId : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Friend not deleted'})
    }

    try {
        friendDelete = await Friend.deleteOne({senderId : req.body.params.userId});
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : 'Error : Friend not deleted'})
    }

    return res.status(200).json({status : true, message : 'User deleted'})

};

async function deleteManyPostCom(PostId){
    try {
        await PostCom.deleteMany({authorId : PostId});
    } catch (err) {
        console.log(err);
        
        return {response : undefined, err : err};
    }

    return {response : true, err : undefined};
}