const messages = {
    DB_CONNECTED: "DB Connected",
    SERVER_CONNECTED: (PORT) => {
        return `Server running at PORT ${PORT}`
    },
    UNAUTHORIZED: "Unauthorized",
    INVALID_DETAILS: 'Invalid username/password'
}

module.exports = messages