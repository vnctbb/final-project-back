'use strict'

const mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
    senderId : {
        type : String,
        required: 'User1 id parameters required',
        default: null
    },
    receiverId : {
        type : String,
        required: 'Receiver id parameters required',
        default: null
    },
    creationDatetime : {
        type : String,
        required: 'Creation datetime empty',
        default: null
    },
    status : {
        type : String,
        required: 'Status empty',
        maxlength : [360,'Content maximum length is 360 characters'],
        default: "WAITING"
    },
});

mongoose.model('Friend', friendSchema, 'friends');