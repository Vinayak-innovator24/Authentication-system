const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const DB = {
    uri: process.env.MONGO_URI,
    user: "",
    password: ""
}

module.exports = {
    PORT,
    DB,
    JWT_SECRET
}