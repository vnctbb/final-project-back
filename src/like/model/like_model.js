'use strict'

const mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    userId : {
        type : String,
        required: 'User id parameters required',
        default: null
    },
    postId : {
        type : String,
        required: 'Related id parameters required',
        default: null
    },
    creationDatetime : {
        type : String,
        required: 'Creation datetime empty',
        default: null
    },
});

mongoose.model('Like', likeSchema, 'likes');