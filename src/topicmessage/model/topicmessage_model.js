'use strict'

const mongoose = require('mongoose');

var topicMessageSchema = new mongoose.Schema({
    topic_id : {
        type : String,
        required: 'Owner ID parameters required',
        default: null
    },
    author_id : {
        type : String,
        required: 'Owner ID parameters required',
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
});

mongoose.model('TopicMessage', topicMessageSchema, 'topicmessages');