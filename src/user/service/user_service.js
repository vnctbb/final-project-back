'use strict';

const { findLastKey } = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User')

exports.saveProfilPicture = (userId, pictureId) => {

    User.findOneAndUpdate({_id : userId}, { $set: {profilPicture : pictureId} }, (err, user) => {
        if (!err) {
            if(user){
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    });
};