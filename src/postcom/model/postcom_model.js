'use strict'

const mongoose = require('mongoose');

var postComSchema = new mongoose.Schema({
    postId : {
        type : String,
        required: 'Post ID parameters required',
        default: null
    },
    authorId : {
        type : String,
        required: 'Author ID parameters required',
        default: null
    },
    authorName : {
        type : String,
        required: 'Author name parameters required',
        default: null
    },
    authorPicture : {
        type : String,
        required: 'author picture parameters required',
    },
    creationDatetime : {
        type : String,
        required: 'Creation datetime parameters required',
        default: null
    },
    modificationDatetime : {
        type : String,
        default: null
    },
    content : {
        type : String,
        required: 'Content parameters required',
        maxlength : [360,'Content maximum length is 360 characters'],
        default: null
    }
});

mongoose.model('PostCom', postComSchema, 'postcoms');