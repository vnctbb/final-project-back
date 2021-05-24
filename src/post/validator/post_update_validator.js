'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.author_id || params.creation_datetime){
        return undefined;
    }

    if (params.content){
        validParams.content = params.content;

        validParams.modification_datetime = params.modification_datetime;

        return validParams
    }
    
    return undefined;
}