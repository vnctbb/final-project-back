'use strict'

const mongoose = require('mongoose');

var topicMessageSchema = new mongoose.Schema({
    topicId : {
        type : String,
        required: 'Topic ID parameters required',
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
        required: 'Topic content parameters required',
        maxlength : [1500,'Content maximum length is 1500 characters'],
        default: null
    },
});

mongoose.model('TopicMessage', topicMessageSchema, 'topicmessages');