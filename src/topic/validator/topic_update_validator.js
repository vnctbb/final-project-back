'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.ownerId || params.creationDatetime){
        return undefined;
    }

    if (params.topicName){
        validParams.topicName = params.topicName;
    }

    if (params.topicDescription){
        validParams.topicDescription = params.topicDescription;
    }

    if(!params.topicName && !params.topicDescription){
        return undefined
    }

    if (params.modificationDatetime){
        validParams.modificationDatetime = params.modificationDatetime;
    } else {
        return undefined
    }
    
    return validParams;
}