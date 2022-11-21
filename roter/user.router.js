const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware')

router.get('/', controller.getAll);

router.post(
    '/',
    middleware.isCreateBodyValid,
    controller.create);

router.get(
    '/:userId',
    middleware.isIdValid,
    middleware.isUserExist,
    controller.getById);

router.put(
    '/:userId',
    middleware.isIdValid,
    middleware.isUpdateBodyValid,
    middleware.isUserExist,
    controller.update);

router.delete(
    '/:userId',
    middleware.isIdValid,
    middleware.isUserExist,
    controller.delete);

module.exports = router;