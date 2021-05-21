'use strict'

exports.create = (user, response) => {
    user.save((err, doc) => {
        response(err);
    })
}