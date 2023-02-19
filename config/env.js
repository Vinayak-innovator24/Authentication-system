const PORT = 9999;
const JWT_SECRET = 'zxcbvnmakakdjdulro1o124987555@#%$6^ldldkddkkdjrororkf';
const DB = {
    uri: "mongodb://localhost:27017/login-app-db",
    user: "",
    password: ""
}

module.exports = {
    PORT,
    DB,
    JWT_SECRET
}