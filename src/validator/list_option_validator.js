'use strict'

exports.optionValidator = (params) => {
    const validParams = {};

    if (params.skip) {
        validParams.skip = params.skip;
    }

    if (params.limit) {
        validParams.limit = params.limit;
    }

    if (params.sort) {
        validParams.sort[params.sort] = 1;
    }
    
    return validParams;
}