const mongoose = require('mongoose')
const {DB} = require('../config/env');
const {DB_CONNECTED} = require('../config/messages');

const db = async() => {
    return mongoose.connect("mongodb+srv://vinayakpande2403:abcd@giphy.eengaet.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then(() => {
        return DB_CONNECTED
    })
}

module.exports = {db};

