'use strict'

const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    authorId : {
        type : String,
        required: 'Author ID parameters required',
        default: null
    },
    authorName : {
        type : String,
        required: 'author name parameters required',
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
        required: 'Content empty',
        maxlength : [360,'Content maximum length is 360 characters'],
        default: null
    }
});

mongoose.model('Post', postSchema, 'posts');