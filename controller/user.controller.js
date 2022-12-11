const {userService, oauthService, emailService} = require('../services');
const {WELCOME, FORGOT_PASS} = require("../config/email-action.enum");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            const users = await userService.findByParams();
            res.json(users);
        } catch (e) {
            next(e)
        }
    },

    create: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password)
            const user = await userService.create({...req.body, password: hashPassword});

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {user, body} = req;

            res.json(req.user);
        } catch (e) {
            next(e)
        }
    },

    update: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const newUser = await userService.updateOne(userId, newUserInfo);

            res.status(201).json(newUser)

        } catch (e) {
            next(e)
        }
    },

    delete: async (req, res, next) => {
        try {
            await userService.delete(req.params.userId)

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
};