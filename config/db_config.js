'use strict'

require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {console.log('MongoDB connection succeeded')}
    else {console.log(`MongoDB connection failed : ${err}`)}
});

require('../models/user_model')