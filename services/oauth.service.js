const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/ApiError");
require('dotenv').config();
const configs = require('../config/config');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (hashPassword, password) => {
        const arePasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!arePasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },
    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, configs.SECRET_ACCESS, {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, configs.SECRET_REFRESH, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }
}