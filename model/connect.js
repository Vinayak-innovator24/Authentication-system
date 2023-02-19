const mongoose = require('mongoose')
const {DB} = require('../config/env');
const {DB_CONNECTED} = require('../config/messages');

const db = async() => {
    return mongoose.connect(DB.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        return DB_CONNECTED
    })
}

module.exports = {db};

