'use strict'

require('dotenv').config();
require('./config/db_config');
require('./config/passport_config');

const cors = require('cors');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const user_controller = require('./routes/user_route');

const app = express();

app.use(cors());
app.use(express.json());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use('/user', user_controller);

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') {
        const valErrors = [];
        Object.keys(err.errors).forEach(key => {
            valErrors.push(err.errors[key].message);
        });
        res.status(422).send(valErrors);
    }
});

app.listen(process.env.PORT, (err) => {
    if (err) return err;
    console.log(`Server running at PORT ${process.env.PORT}`);
});