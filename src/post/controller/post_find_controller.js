'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
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

        if(req.body.params.authorsList){
            filter = {
                author_id : req.body.params.authorsList
            }
        }

        optionV = option_validator.optionValidator(req.body.params);
    }

    let posts = await Post.find(filter, {__v : 0}, optionV)
    if (posts.length == 0){

        return res.status(400).json({status : false, message : "Error : Posts not found"});
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

        response.push(addPost)

    }

    return res.status(200).json({status : true, response : response});
};

exports.listByAuthorId = async (req, res, next) => {

    const response = [];

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    if(!req.body.params.authorId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    let user = await User.findOne({_id : req.body.params.authorId});
    if (!user){

        return res.status(400).json({status : false, message : "Error : Author not found"});
    }

    let posts = await Post.find({authorId : req.body.params.authorId}, {__v : 0, author_id : 0}, optionV);
    if (posts.length == 0){

        return res.status(400).json({status : false, message : "Error : Posts not found"});
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

        response.push(addPost)

    }

    return res.status(200).json({status : true, response : response});
    
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

