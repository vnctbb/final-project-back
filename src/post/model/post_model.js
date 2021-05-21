'use strict'

const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
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
        required: 'Content empty',
        maxlength : [360,'Content maximum length is 360 characters'],
        default: null
    },
    like : {
        type : Number,
        default: null
    }
});

mongoose.model('Post', postSchema, 'posts');