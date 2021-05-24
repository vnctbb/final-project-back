'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if (params._id){
        validParams._id = params._id
    } else {
        return undefined
    }

    if (params.content){
        validParams.topic_name = params.topic_name;
    } else {
        return undefined
    }

    if (params.modification_datetime){
        validParams.modification_datetime = params.modification_datetime;
    } else {
        return undefined
    }
    
    return validParams;
}