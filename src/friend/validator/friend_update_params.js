'use strict'

exports.updateValidator = (params) => {
    const validParams = {};

    if (params.status){
        if(params.status === "ACCEPTED" || params.status === "REJECTED"){
            validParams.status = params.status;
            return validParams
        }
    }
    
    return undefined;
}