const router = require('express').Router();

const {userController} = require('../controller');
const middleware = require('../middleware/user.middleware')

router.get('/', userController.getAll);

router.post(
    '/',
    middleware.isCreateBodyValid,
    middleware.userNormalizator,
    middleware.checkIsEmailUnique,
    userController.create);

router.get(
    '/:userId',
    middleware.isUserExist,
    userController.getById);

router.put(
    '/:userId',
    middleware.isUpdateBodyValid,
    middleware.userNormalizator,
    middleware.isUserExist,
    userController.update);

router.delete(
    '/:userId',
    middleware.isUserExist,
    userController.delete);

module.exports = router;