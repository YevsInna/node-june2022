const {userService} = require('../services');

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
            const userInfo = req.body;
            const user = await userService.create(userInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
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