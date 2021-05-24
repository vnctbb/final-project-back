'use strict'

exports.updateValidator = (params) => {
    const validUpdate = {};

    if(params._id || params.security_level || params.saltSecret || params.__v){
        return validUpdate;
    }

    if(params.email_address){
        validUpdate.email_address = params.email_address;
    }

    if(params.password){
        validUpdate.password = params.password;
    }

    if(params.first_name){
        validUpdate.first_name = params.first_name;
    }

    if(params.last_name){
        validUpdate.last_name = params.last_name;
    }

    if(params.genre){
        validUpdate.genre = params.genre;
    }

    if(params.age){
        validUpdate.age = params.age;
    }

    if(params.phone_number){
        validUpdate.phone_number = params.phone_number;
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

    if(params.profil_picture){
        validUpdate.profil_picture = params.profil_picture;
    }
    
    return validUpdate;
}