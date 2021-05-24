'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.owner_id || params.creation_datetime){
        return undefined;
    }

    if (params.topic_name){
        validParams.topic_name = params.topic_name;
    }

    if (params.topic_description){
        validParams.topic_description = params.topic_description;
    }

    if(!params.topic_name && !params.topic_description){
        return undefined
    }

    if (params.modification_datetime){
        validParams.modification_datetime = params.modification_datetime;
    } else {
        return undefined
    }
    
    return validParams;
}