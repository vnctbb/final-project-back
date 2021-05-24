'use strict'

const mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required: 'User id parameters required',
        default: null
    },
    post_id : {
        type : String,
        required: 'Related id parameters required',
        default: null
    },
    creation_datetime : {
        type : String,
        required: 'Creation datetime empty',
        default: null
    },
});

mongoose.model('Like', likeSchema, 'likes');