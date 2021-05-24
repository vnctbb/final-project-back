'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if (params.content){
        validParams.content = params.content;

        validParams.modification_datetime = params.modification_datetime;

        return validParams
    }
    
    return undefined;
}