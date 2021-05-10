'use strict'

const mongoose = require('mongoose')

const User = mongoose.model('User')

exports.createUser = (req, res, next) => {
    const user = new User()

    user.email = req.body.params.email;
    user.firstName = req.body.params.firstName;
    user.lastName = req.body.params.lastName;
    user.password = req.body.params.password;

    user.save((err, doc) => {
        if(!err){
            res.status(200).json({status : true, message : 'User created'})
        } else {
            if(err.code === 11000){
                res.status(422).json({status : false, message : 'Provided email already used'})
            } else {
                return next(err)
            }
        }
    })

};