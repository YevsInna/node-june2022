module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test-project',

    SECRET_ACCESS: process.env.SECRET_ACCESS || 'secret access word',
    SECRET_REFRESH: process.env.SECRET_REFRESH || 'secret refresh word',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD
}