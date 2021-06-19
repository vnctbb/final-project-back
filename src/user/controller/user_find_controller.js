'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Friend = mongoose.model('Friend')

const option_validator = require('../validator/list_option_validator');

exports.findOneById = async  (req, res, next) => {

    if(!req.body.userId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    if(req.body.userId == req._id){
        return res.status(400).json({status : false, error : "DUPLICATE_ID", message : "Error : Invalid parameters (Duplicate Id)"});
    }

    let friend = await Friend.findOne({senderId : req.body.userId, receiverId : req._id});

    if (!friend || friend.status != "ACCEPTED"){

        if(!friend){
            friend = await Friend.findOne({senderId : req._id, receiverId : req.body.userId});
        }

        if(!friend || friend.status != "ACCEPTED"){

            let user = await User.findOne({_id : req.body.userId}, {password : 0, saltSecret : 0, __v : 0, securityLevels : 0});

            if(user){
                const userData = {
                    _id : user._id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    profilPicture : user.profilPicture
                }

                if(friend){
                    if(friend.status == "WAITING"){
                        return res.status(200).json({user : userData, friend : friend});
                    }
                }

                return res.status(200).json({user : userData, friend : undefined});

            } else {

                return res.status(400).json({status : false, message : "Error : User not found"});
            }
        }
    }
    
    let user = await User.findOne({_id : req.body.userId}, {password : 0, saltSecret : 0, __v : 0, securityLevels : 0});
    if(user){
        res.status(200).json({user : user, friend : friend});
    } else {
        return res.status(400).json({status : false, message : "Error : User not found"});
    }

};

exports.findOneMinById = (req, res, next) => {

    if(!req.body.userId){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    User.findOne({_id : req.body.userId}, 'first_name last_name', (err, user) => {
        if(user){
            if(!err){
                res.json(user);
            } else {
                return next(err);
            };
        } else {
            return res.status(400).json({status : false, message : "Error : User not found"});
        }
    });

};

exports.findList = (req, res, next) => {

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    }

    User.find({}, {password : 0, saltSecret : 0, __v : 0, securityLevels : 0}, optionV, (err, users) => {
        if(users.length == 0){
            return res.status(400).json({status : false, message : "Error : User not found"});
        } else {
            if(!err){
                return res.status(200).json({status : true, users : users});
            } else {
                return next(err);
            }
        }
    });
};

exports.search = async (req, res, next) => {
    const fields = {
        _id : 1,
        firstName : 1,
        lastName : 1,
        emailAddress : 1,
        securityLevel : 1
    }

    let optionV = {};

    if(req.body.params){
        optionV = option_validator.optionValidator(req.body.params);
    } else {
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    if(!req.body.params.searchValue){
        return res.status(400).json({status : false, message : "Error : Invalid parameters"});
    }

    const searchValue = req.body.params.searchValue

    const firstSpace = searchValue.split(" ", 1).join(" ").length;
    const secondSpace = searchValue.split(" ", 2).join(" ").length;

    const firstPart = searchValue.substr(0,firstSpace)
    const secondPart = searchValue.substr(firstSpace + 1, secondSpace)

    let users = await User.find({firstName : new RegExp(firstPart, 'i'), lastName : new RegExp(secondPart, 'i') }, fields, optionV)

    let allUserId  = [];
    if(users.length > 0){
        users.forEach(item => allUserId.push(item._id));
    }

    if(users.length == 0){
        users = await User.find({firstName : new RegExp(secondPart, 'i'), lastName : new RegExp(firstPart, 'i') }, fields, optionV)
    } else {
        if(req.body.params.limit){
            if (users.length < (optionV.limit -optionV.skip)){
                
                optionV.limit = optionV.limit -optionV.skip;

                let moreUsers = await User.find({firstName : new RegExp(secondPart, 'i'), lastName : new RegExp(firstPart, 'i'), _id: {$nin: allUserId} }, fields, optionV);

                if (moreUsers.length > 0) {
                    moreUsers.forEach(item => users.push(item))
                }
            }
        }
    }

    allUserId  = [];
    if(users.length > 0){
        users.forEach(item => allUserId.push(item._id));
    }

    if(firstPart.length > 0 && secondPart.length > 0){
        if(users.length == 0){
            users = await User.find({firstName : {$in : [new RegExp(firstPart, 'i'), new RegExp(secondPart, 'i')]}}, fields, optionV)
        } else {
            if(req.body.params.limit){
                if (users.length < (optionV.limit -optionV.skip)){
                    
                    optionV.limit = optionV.limit -optionV.skip;
    
                    let moreUsers = await User.find({firstName :{$in : [new RegExp(firstPart, 'i'), new RegExp(secondPart, 'i')]}, _id: {$nin: allUserId}}, fields, optionV)
    
                    if (moreUsers.length > 0) {
                        moreUsers.forEach(item => users.push(item))
                    }
                }
            }
        }
    
        allUserId  = [];
        if(users.length > 0){
            users.forEach(item => allUserId.push(item._id));
        }
    
        if(users.length == 0){
            users = await User.find({lastName : {$in : [new RegExp(firstPart, 'i'), new RegExp(secondPart, 'i')]}}, fields, optionV)
        } else {
            if(req.body.params.limit){
                if (users.length < (optionV.limit -optionV.skip)){
                    
                    optionV.limit = optionV.limit -optionV.skip;
    
                    let moreUsers = await User.find({lastName :{$in: [new RegExp(firstPart, 'i'), new RegExp(secondPart, 'i')]}, _id: {$nin: allUserId}}, fields, optionV)
    
                    console.log(moreUsers)
    
                    if (moreUsers.length > 0) {
                        moreUsers.forEach(item => users.push(item))
                    }
                }
            }
        }
    } else {
        if (firstPart.length > 0) {
            if(users.length == 0){
                users = await User.find({firstName : new RegExp(firstPart, 'i')}, fields, optionV)
            } else {
                if(req.body.params.limit){
                    if (users.length < (optionV.limit -optionV.skip)){
                        
                        optionV.limit = optionV.limit -optionV.skip;
        
                        let moreUsers = await User.find({firstName : new RegExp(firstPart, 'i'), _id: {$nin: allUserId}}, fields, optionV)
        
                        if (moreUsers.length > 0) {
                            moreUsers.forEach(item => users.push(item))
                        }
                    }
                }
            }
        
            allUserId  = [];
            if(users.length > 0){
                users.forEach(item => allUserId.push(item._id));
            }

        } else {
            if (secondPart.length > 0) {
                if(users.length == 0){
                    users = await User.find({lastName : new RegExp(secondPart, 'i')}, fields, optionV)
                } else {
                    if(req.body.params.limit){
                        if (users.length < (optionV.limit -optionV.skip)){
                            
                            optionV.limit = optionV.limit -optionV.skip;
            
                            let moreUsers = await User.find({lastName : new RegExp(firstPart, 'i'), _id: {$nin: allUserId}}, fields, optionV)
            
                            if (moreUsers.length > 0) {
                                moreUsers.forEach(item => users.push(item))
                            }
                        }
                    }
                }
            
            }
        }
    }

    return res.status(200).json({status : true, users : users});
};

