const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/env')
const {User} = require('../model/user')
const {UNAUTHORIZED} = require('../config/messages')


const check = (req, res, next) => {
    const token = req.headers['authorization']; 
    jwt.verify(token, JWT_SECRET, async(err, data) => {
        if(err || !data) {
            res.send(UNAUTHORIZED);
            return;
        }

        const _id = data._id;
        req.body._id = _id;
        const user = await User.findOne({ _id: _id }).lean()
        if(!user) {
            res.send(UNAUTHORIZED);
        } else {
            next();
        }
    });

}

module.exports = {
    check
}