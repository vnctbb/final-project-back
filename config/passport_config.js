'use strict'

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField : 'email' }, (username, password, done) => {
        User.findOne({ emailAddress : username }, (err, user) => {
            if(err){
                return done(err);
            } else if(!user){
                return done(null, false, {message : 'User with given email not found'});
            } else if (!user.verifyPassword(password)){
                return done(null, false, {message : 'Wrong password'});
            } else {
                return done(null, user);
            }
        });
    })
);