const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/ApiError");
require('dotenv').config();
const configs = require('../config/config');
const {tokenTypeEnum} = require("../enum");
const {SECRET_ACCESS, SECRET_REFRESH} = require("../config/config");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePassword: async (hashPassword, password) => {
        const arePasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!arePasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, configs.SECRET_ACCESS, {expiresIn: '5m'});
        const refreshToken = jwt.sign(dataToSign, configs.SECRET_REFRESH, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    },
generateActionToken: (actionType, dataToSign = {})=>{
      const actionToken = jwt.sign(dataToSign, SECRET_ACCESS, {expiresIn: '7d'});

      return actionToken;
},

    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let secret = '';

            if (tokenType === tokenTypeEnum.accessToken) secret = SECRET_ACCESS;
            else if (tokenType === tokenTypeEnum.refreshToken) secret = SECRET_REFRESH;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    }
}