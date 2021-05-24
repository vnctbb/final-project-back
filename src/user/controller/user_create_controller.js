'use strict'

const mongoose = require('mongoose')

const User = mongoose.model('User')

const user_constant = require('../constant/user_constant');
const user_create_repository = require('../repository/create');


exports.createUser = (req, res, next) => {
    const user = new User(req.body.params);

    user.email_address = req.body.params.email_address

    user.security_level = user_constant.USER_SECURITY_LEVEL;

    user_create_repository.create(user, (err) => {
        if(!err){
            res.status(200).json({status : true, message : 'User created', id : user._id})
        } else {
            if(err.code === 11000){
                console.log(err)
                res.status(422).json({status : false, message : 'Provided email already used'})
            } else {
                return next(err)
            }
        }
    })

};


exports.createUserAdmin = (req, res, next) => {

    const user = new User(req.body.params);

    user.email_address = req.body.params.email_address

    if(req.body.params.security_level){
        user.security_level = req.body.params.security_level;
    }
    user.security_level = user_constant.ADMIN_SECURITY_LEVEL;

    user_create_repository.create(user, (err) => {
        if(!err){
            res.status(200).json({status : true, message : 'User created'})
        } else {
            if(err.code === 11000){
                console.log(err)
                res.status(422).json({status : false, message : 'Provided email already used'})
            } else {
                return next(err)
            }
        }
    })

};