const {fileService} = require('../services');
const User = require('../db/User')

module.exports = {

    getAll: async (req, res, next) => {
        try {
            const users = await fileService.reader();
            res.json(users);
        } catch (e) {
            next(e)
        }
    },

    create: async (req, res, next) => {
        try {
            const userInfo = req.body;
            const users = await fileService.reader();

            const newUser = {
                name: userInfo.name,
                age: userInfo.age,
                id: users[users.length - 1].id + 1
            };

            await fileService.writer(users);

            res.status(201).json(newUser);
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
            const {user, users, body} = req;

            const index = users.findIndex((value) => value.id === user.id);
            users[index] = {...users[index], ...body};

            await fileService.writer(users);

            res.status(201).json(users[index])

        } catch (e) {
            next(e)
        }
    },

    delete: async (req, res, next) => {
        try {
            const {user,users} = req;

            const index = users.findIndex((value) => value.id === user.id);
            users.splice(index, 1);

            await fileService.writer(users);

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
};