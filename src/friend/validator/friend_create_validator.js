'use strict'

exports.createValidator = (params) => {

    if (params.status){
        return undefined;
    }
    
    return params;
}