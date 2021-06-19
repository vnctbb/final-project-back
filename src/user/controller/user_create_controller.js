'use strict'

const { upperFirst } = require('lodash');
const mongoose = require('mongoose')

const User = mongoose.model('User')

const user_constant = require('../constant/user_constant');

exports.createUser = async (req, res, next) => {
    const user = new User(req.body);

    user.emailAddress = req.body.emailAddress

    user.securityLevel = user_constant.USER_SECURITY_LEVEL;

    user.creationDatetime = Date.now();

    console.log(user.emailAddress)

    let doc
    try {
        doc = await user.save();
    } catch (err) {
        if(err.code === 11000){
            return res.status(422).json({status : false, message : err.message})
        } else {
            return res.status(400).json({status : false, message : err.message})
        }
    }

    if (doc){

        return res.status(200).json({status : true, message : 'User created', id : doc._id});
    } else {

        return res.status(400).json({status : false, message : 'Error : User not created'})
    }

};


exports.createAdmin = async (req, res, next) => {

    const user = new User(req.body.params);

    user.emailAddress = req.body.params.emailAddress

    if(req.body.params.securityLevel){
        user.securityLevel = req.body.params.securityLevel;
    }
    user.securityLevel = user_constant.ADMIN_SECURITY_LEVEL;

    let doc
    try {
        doc = await user.save();
    } catch (err) {
        if(err.code === 11000){

            return res.status(422).json({status : false, message : 'Provided email already used'})
        } else {

            return res.status(400).json({status : true, message : 'Error : User not created'})
        }
    }

    if (doc){

        return res.status(200).json({status : true, message : 'User created', id : doc._id});
    } else {

        return res.status(400).json({status : true, message : 'Error : User not created'})
    }

};