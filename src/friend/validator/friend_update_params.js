'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.sender_id || params.receiver_id || params.creation_datetime){
        return undefined;
    }

    if (params.status){
        if(params.status === "ACCEPTED" || params.status === "REJECTED"){
            validParams.status = params.status;
            return validParams
        }
    }
    
    return undefined;
}