'use strict'

const mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    owner_id : {
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
    topic_name : {
        type : String,
        required: 'Topic name parameters required',
        default: null
    },
    topic_description : {
        type : String,
        required: 'Topic description parameters required',
        maxlength : [360,'Content maximum length is 360 characters'],
        default: null
    }
});

mongoose.model('Topic', topicSchema, 'topics');