'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.postId || params.creationDatetime || params.authorId){
        return undefined;
    }

    if (params.content){
        validParams.content = params.content;
    } else {
        return undefined
    }

    if (params.modificationDatetime){
        validParams.modificationDatetime = params.modificationDatetime;
    } else {
        return undefined
    }
    
    return validParams;
}