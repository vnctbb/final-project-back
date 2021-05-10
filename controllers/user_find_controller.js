'use strict'

const mongoose = require('mongoose')

const User = mongoose.model('User')

exports.findOneByEmail = (req, res, next) => {

    console.log('find user with id : ' + req.body.params.email)

    const fields = [
        'email',
        'firstName',
        'lastName'
    ]

    User.findOne({email : req.body.params.email}, fields, (err, user) => {
        if(!err){
            res.json(user);
        } else {
            return next(err);
        }
    })

};