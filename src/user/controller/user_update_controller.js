'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.updateProfile = (req, res, next) => {

    User.findOneAndUpdate({_id : req.body._id}, { $set: req.body.params }, {password : 0, saltSecret : 0, __v : 0}, (err, user) => {
        if (!err) {
            if(user){
                res.status(200).json({status : true, message : 'User updated'})
            } else {
                return res.status(404).json({status : false, message : `Error updating user => user not found`});
            }
        } else {
            return res.status(404).json({status : false, message : `Error updating user => ${err}`});
        }
    });

};