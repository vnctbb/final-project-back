'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.deleteUser = (req, res, next) => {

    User.findOne({_id : req._id}, (err, user) => {
        if(user){
            User.deleteOne({_id : req._id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'User deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'User not found.'});
            }
        }
    })

};

exports.deleteUserAdmin = (req, res, next) => {

    User.findOne({_id : req.body.params.id}, (err, user) => {
        if(user){
            User.deleteOne({_id : req.body.params.id}, (err) => {
                if(!err){
                    res.status(200).json({status : true, message : 'User deleted'})
                } else {
                    return next(err);
                }
            })
        } else {
            if(err){
                return next(err)
            } else {
                return res.status(404).json({status : false, message : 'User not found.'});
            }
        }
    })

};