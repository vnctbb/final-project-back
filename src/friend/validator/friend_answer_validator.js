'use strict'

exports.answerValidator = (params) => {
    const validParams = {};

    if(params._id || params.__v || params.senderId || params.receiverId || params.creationDatetime){
        return undefined;
    }

    if (params.status){
        if(params.status === "ACCEPTED" || params.status === "DECLINED"){
            validParams.status = params.status;

            if(params.modificationDatetime){
                validParams.modificationDatetime = params.modificationDatetime;
            }
            
            return validParams
        }
    }

    return undefined;
}