'use strict'

exports.optionValidator = (params) => {
    const validParams = {};

    if (params.skip) {
        validParams.skip = params.skip;
    } else {
        validParams.skip = 0;
    }

    if (params.limit) {
        validParams.limit = params.limit;
    }

    if (params.sort) {
        validParams.sort = params.sort;
    }
    
    return validParams;
}