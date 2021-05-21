'use strict'

const mongoose = require('mongoose');

var postComSchema = new mongoose.Schema({
    post_id : {
        type : String,
        required: 'Post ID parameters required',
        default: null
    },
    author_id : {
        type : String,
        required: 'Author ID parameters required',
        default: null
    },
    creation_datetime : {
        type : String,
        required: 'Creation datetime parameters required',
        default: null
    },
    modification_datetime : {
        type : String,
        default: null
    },
    content : {
        type : String,
        required: 'Content parameters required',
        maxlength : [360,'Content maximum length is 360 characters'],
        default: null
    },
    like : {
        type : Number,
        default: null
    }
});

mongoose.model('PostCom', postComSchema, 'postcoms');