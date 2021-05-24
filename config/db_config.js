'use strict'

require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {console.log('MongoDB connection succeeded')}
    else {console.log(`MongoDB connection failed : ${err}`)}
});

require('../src/user/model/user_model')
require('../src/friend/model/friend_model')
require('../src/post/model/post_model')
require('../src/topic/model/topic_model')