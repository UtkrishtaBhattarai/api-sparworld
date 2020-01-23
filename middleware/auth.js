const jwt = require('jsonwebtoken');
const Register = require('../models/register');
const config=require('../config');
module.exports.verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set!");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, config.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    Register.findById(data._id)
        .then((Register) => {
            req.Register = Register;
            next();
        })
}