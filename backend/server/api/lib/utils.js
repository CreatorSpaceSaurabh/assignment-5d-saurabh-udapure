'use strict';
var jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = {
    ensureAuthorized: ensureAuthorized
}

function ensureAuthorized(req, res, next) {
    var unauthorizedJson = { code: 401, 'message': 'Unauthorized', data: {} };
    var token = req.headers["authorization"] || req.query["api_key"];
    if (typeof token !== 'undefined') {
        var splitToken = token.split(' ');
        try {

            token = splitToken[1];
            var decoded = jwt.verify(token, '5dmoment');
            req.user = decoded;
            console.log("req.user", req.user)
            if (splitToken[0] == 'Bearer') {
                User.findOne({ _id:decoded.id, is_deleted: false }).exec(function (err, user) {
                    if (err || !user) {
                        console.log("err 4")
                        res.json(unauthorizedJson);
                    } else {
                        req.user = user;
                        next();
                    }
                });
            } else {
                console.log("err 1")
                res.json(unauthorizedJson);
            }
        } catch (err) {
            console.log("err 2", err)
            res.json(unauthorizedJson);
        }
    } else {
        console.log("err 3")
        res.json(unauthorizedJson);
    }
}