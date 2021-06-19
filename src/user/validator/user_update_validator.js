'use strict'

exports.updateValidator = (params) => {
    const validUpdate = {};

    if(params.emailAddress){
        validUpdate.emailAddress = params.emailAddress;
    }

    if(params.password){
        validUpdate.password = params.password;
    }

    if(params.firstName){
        validUpdate.firstName = params.firstName;
    }

    if(params.lastName){
        validUpdate.lastName = params.lastName;
    }

    if(params.genre){
        validUpdate.genre = params.genre;
    }

    if(params.age){
        if(params.age > 99 || params.age < 0){
            return {}
        }
        validUpdate.age = params.age;
    }

    if(params.phoneNumber){
        validUpdate.phoneNumber = params.phoneNumber;
    }

    if(params.country){
        validUpdate.country = params.country;
    }

    if(params.presentation){
        validUpdate.presentation = params.presentation;
    }

    if(params.favorites){
        validUpdate.favorites = params.favorites;
    }

    if(params.profilPicture){
        validUpdate.profilPicture = params.profilPicture;
    }

    console.log("FROM VALIDATOR : ", validUpdate)
    
    return validUpdate;
}