'use strict'

const mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    ownerId : {
        type : String,
        required: 'Owner ID parameters required',
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
    topicName : {
        type : String,
        required: 'Topic name parameters required',
        maxlength : [180,'Name maximum length is 180 characters'],
        default: null
    },
    topicDescription : {
        type : String,
        required: 'Topic description parameters required',
        maxlength : [500,'Content maximum length is 500 characters'],
        default: null
    }
});

mongoose.model('Topic', topicSchema, 'topics');