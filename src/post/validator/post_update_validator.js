'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.authorId || params.creationDatetime){
        return undefined;
    }

    if (params.content){
        validParams.content = params.content;

        validParams.modificationDatetime = params.modificationDatetime;

        return validParams
    }
    
    return undefined;
}