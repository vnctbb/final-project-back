'use strict'

const mongoose = require('mongoose');

var topicMessageSchema = new mongoose.Schema({
    topic_id : {
        type : String,
        required: 'Topic ID parameters required',
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
        required: 'Topic content parameters required',
        maxlength : [1500,'Content maximum length is 1500 characters'],
        default: null
    },
});

mongoose.model('TopicMessage', topicMessageSchema, 'topicmessages');