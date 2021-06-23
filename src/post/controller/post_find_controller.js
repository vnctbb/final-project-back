'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Friend = mongoose.model('Friend');
const Post = mongoose.model('Post');
const PostCom = mongoose.model('PostCom');
const Like = mongoose.model('Like');

const option_validator = require('../../validator/list_option_validator');

exports.findOne = async (req, res, next) => {

    if(!req.body.postId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let post;
    try {
        post = await Post.findOne({_id : req.body.postId})
    } catch (err) {
        console.log(err);
        
        return res.status(400).json({status : false, message : "Error : Post not found"});
    }
    
    if(!post){

        return res.status(400).json({status : false, message : "Error : Post not found"});
    }

    let postCom = await getPostCom(req.body.postId);
    if (postCom.err){
        console.log('PostCom error : ', postCom.err)

        return res.status(400).json({status : false, error : postCom.err, message : "Error : PostCom not found"});
    }

    let like = await getLike(req.body.postId);
    if (like.err){
        console.log('Like error : ', like.err)

        return res.status(400).json({status : false, error : like.err, message : "Error : Like not found"});
    }

    return res.status(200).json({status : true, post : post, postCom : postCom.response, like : like.response});
};

exports.list = async (req, res, next) => {

    const response = [];

    let filter = {};

    let optionV;

    if(req.body.params){

        optionV = option_validator.optionValidator(req.body.params);
    }

    let friends = await Friend.find({$or : [{ senderId: req._id }, { receiverId: req._id }], status : 'ACCEPTED'}, {__v : 0, saltSecret : 0, password : 0}, optionV)

    const postSearchFriend = [];
    friends.forEach(item => {
        if(item.senderId == req._id){
            postSearchFriend.push(item.receiverId)
        } else {
            if(item.receiverId == req._id)
            postSearchFriend.push(item.senderId)
        }
    })

    postSearchFriend.push(req._id)

    let postsCount = await Post.count({authorId : postSearchFriend})

    console.log(postSearchFriend)

    let posts = await Post.find({authorId : postSearchFriend}, {__v : 0}, optionV)
    if (posts.length == 0){

        return res.status(200).json({status : false, posts : []});
    }

    for (let i = 0; i < posts.length; i++) {
        const addPost =  {};
    
        addPost.post = posts[i];

        let postCom = await getPostCom(posts[i]._id);
        if (postCom.err){

            return res.status(200).json({status : false, postCom : []});
        }

        addPost.postCom = postCom.response;

        let like = await getLike(posts[i]._id);
        if (like.err){

            return res.status(200).json({status : false, likes : []});
        }

        addPost.like = like.response;

        let liked = await checkLiked(posts[i]._id, req._id);
        if (liked.err){
            console.log('Like error : ', like.err)

            return res.status(400).json({status : false, error : like.err, message : "Error : Like not found"});
        }

        addPost.liked = liked;

        response.push(addPost)

    }

    return res.status(200).json({status : true, response : response, count : postsCount});
};

exports.listByAuthorId = async (req, res, next) => {

    let postLength = await Post.count({authorId : req._id});

    const response = [];

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    let friend;
    console.log(req.body.params.friendId)
    if(!req.body.params.authorId){
        req.body.params.authorId = req._id
    } else {
        if(req.body.params.friendId){
            friend = await Friend.findOne({_id : req.body.params.friendId});
            if(!friend || friend.status != "ACCEPTED"){
                return res.status(400).json({status : false, message : "Error : Friend not found / invalid"});
            }
        } else {
            return res.status(400).json({status : false, message : "Error : Friend id not given"});
        }
    }

    let user = await User.findOne({_id : req.body.params.authorId});
    if (!user){

        return res.status(400).json({status : false, message : "Error : Author not found"});
    }

    let posts = await Post.find({authorId : req.body.params.authorId}, {__v : 0, author_id : 0}, optionV);
    if (posts.length == 0){

        return res.status(200).json({status : true, response : [], length : 0});
    }

    for (let i = 0; i < posts.length; i++) {
        const addPost =  {};
    
        addPost.post = posts[i];

        let postCom = await getPostCom(posts[i]._id);
        if (postCom.err){
            console.log('PostCom error : ', postCom.err)

            return res.status(400).json({status : false, error : postCom.err, message : "Error : PostCom not found"});
        }

        addPost.postCom = postCom.response;

        let like = await getLike(posts[i]._id);
        if (like.err){
            console.log('Like error : ', like.err)

            return res.status(400).json({status : false, error : like.err, message : "Error : Like not found"});
        }

        addPost.like = like.response;

        let liked = await checkLiked(posts[i]._id, req._id);
        if (liked.err){
            console.log('Like error : ', like.err)

            return res.status(400).json({status : false, error : like.err, message : "Error : Like not found"});
        }

        addPost.liked = liked;

        response.push(addPost)

    }

    return res.status(200).json({status : true, response : response, count : postLength});
    
};

async function getPostCom (postId) {
    let postCom;
    try {
        postCom = await PostCom.find({postId : postId});
    } catch (err) {
        console.log(err);

        return {response : undefined, err : err};
    }

    return {response : postCom, err : undefined};
}

async function getLike (postId) {
    let like;
    try {
        like = await Like.find({postId : postId});
    } catch (err) {
        console.log(err);

        return {response : undefined, err : err};
    }

    return {response : like, err : undefined};
}

async function checkLiked (postId, userId) {
    let like;
    try {
        like = await Like.findOne({postId : postId, userId : userId});
    } catch (err) {
        console.log(err);

        return {liked : false, err : undefined};
    }

    if(!like){
        return {liked : false, err : undefined};
    }

    return {liked : true, err : undefined};
}

exports.listAdmin = async (req, res, next) => {
    let optionV;

    if(req.body.params){

        optionV = option_validator.optionValidator(req.body.params);
    }

    let posts = await Post.find({}, {__v : 0}, optionV)

    return res.status(200).json({status : false, posts : posts});
}
