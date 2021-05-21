'use strict'

require('dotenv').config();
require('./config/db_config');
require('./config/passport_config');

const cors = require('cors');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const user_route = require('./src/user/routes/user_routes');
const friend_route = require('./src/friend/routes/friend_routes');
const post_route = require('./src/post/routes/post_routes');

const app = express();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use( bodyParser.urlencoded({ extended: true }) );

// Passport Middleware
app.use(passport.initialize());

// à vérifier si fonctionne sans? Choisir avec bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Index Route
app.use('/user', user_route);
app.use('/friend', friend_route);
app.use('/post', post_route);

// Error management
app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') {
        const valErrors = [];
        Object.keys(err.errors).forEach(key => {
            valErrors.push(err.errors[key].message);
        });
        res.status(422).send(valErrors);
    } else {
        console.log(err)
        res.status(500).send(err.errors);
    }
});

// Start server
app.listen(process.env.PORT, (err) => {
    if (err) return err;
    console.log(`Server running at PORT ${process.env.PORT}`);
});