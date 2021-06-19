'use strict'

exports.optionValidator = (params) => {
    const validParams = {};

    if (params.skip >= 0) {
        validParams.skip = params.skip;
    }

    if (params.limit) {
        validParams.limit = params.limit;
    }

    if (params.sort) {
        validParams.sort = params.sort;
    }
    
    return validParams;
}