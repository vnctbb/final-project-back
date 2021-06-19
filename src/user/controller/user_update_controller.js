'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

const update_validator = require('../validator/user_update_validator');

exports.updateProfile = (req, res, next) => {

    let validParams;

    if(req.body){
        validParams = update_validator.updateValidator(req.body);
    } else {
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    if(validParams == {}){
        return res.status(400).json({status : false, message : 'Invalid parameters'});
    }

    console.log(req.body._id);

    console.log(validParams);

    User.findOneAndUpdate({_id : req.body._id}, { $set: validParams }, {password : 0, saltSecret : 0, __v : 0}, (err, user) => {
        if (!err) {
            if(user){
                res.status(200).json({status : true, message : 'User updated', id : user._id})
            } else {
                return res.status(404).json({status : false, message : `Error updating user => user not found`});
            }
        } else {
            return res.status(404).json({status : false, message : `Error updating user => ${err}`});
        }
    });

};