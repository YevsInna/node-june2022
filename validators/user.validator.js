const Joi = require('joi');
const {EMAIL, PASSWORD} = require("../config/regexp.enum");

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(1).max(50).required().default(''),
        email: Joi.string().regex(EMAIL).trim().lowercase(),
        password: Joi.string().regex(PASSWORD).required(),
        age: Joi.number().integer().min(1).max(120)
    })
};