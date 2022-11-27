const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware')

router.get('/', controller.getAll);

router.post(
    '/',
    middleware.isCreateBodyValid,
    middleware.userNormalizator,
    middleware.checkIsEmailUnique,
    controller.create);

router.get(
    '/:userId',
    middleware.isUserExist,
    controller.getById);

router.put(
    '/:userId',
    middleware.isUpdateBodyValid,
    middleware.userNormalizator,
    middleware.isUserExist,
    controller.update);

router.delete(
    '/:userId',
    middleware.isUserExist,
    controller.delete);

module.exports = router;