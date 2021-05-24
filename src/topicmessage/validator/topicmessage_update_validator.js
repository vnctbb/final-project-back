'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.topic_id || params.author_id || params.creation_datetime){
        return undefined;
    }

    if (params.content){
        validParams.content = params.content;
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