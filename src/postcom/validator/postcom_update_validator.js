'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.post_id || params.creation_datetime || author_id){
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