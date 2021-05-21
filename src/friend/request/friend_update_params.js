'use strict'

exports.friendUpdateParams = (params) => {
    const validParams = {};

    if (params.status){
        if(params.status === "ACCEPTED" || params.status === "REJECTED"){
            validParams.status = params.status;
        }
    }
    
    return validParams;
}