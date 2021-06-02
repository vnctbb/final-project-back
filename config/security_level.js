const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = (req, res, next) => {

    User.findOne({_id : req._id}, {password : 0, saltSecret : 0, __v : 0}, (err, user) => {
        if(!err){
            if(user.securityLevel < 6){
                return res.status(403).send({auth : false, message : 'Forbidden access'});
            } else {
                req.securityLevel = user.securityLevel;
                next();
            }
        } else {
            return res.status(500).send({auth : false, message : `Security level failure : ${err}`});
        }
    })

};