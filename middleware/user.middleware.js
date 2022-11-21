const ApiError = require('../error/ApiError');
const {fileServices} = require('../services/file.service');

module.exports = {
    isUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const users = await fileServices.render();
            const user = user.find((value) => value.id === +userId);

            if (!user) {
                throw new ApiError('User not found', 404)
            }

            req.users = users;
            req.user = user;
            next();

        } catch (e) {
            next(e)
        }
    },

    isCreateBodyValid: (req, res, next) => {
        try {
            const {name, age} = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name', 400);
            }
            next();
        } catch (e) {
            next(e)
        }
    },
    isUpdateBodyValid: (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new ApiError('Wrong name', 400);
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw  new ApiError('Wrong age', 400);
            }
            next();
        } catch (e) {
            next(e)
        }
    },

    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.params;
            if (userId < 0 || Number.isNaN(+userId)) {
                throw  new ApiError('Id is not valid', 400);
            }
            next();
        } catch (e) {
            next(e)
        }
    }
};