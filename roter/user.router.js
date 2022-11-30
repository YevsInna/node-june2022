const router = require('express').Router();

const {userController} = require('../controller');
const middleware = require('../middleware/user.middleware')

router.get('/', userController.getAll);

router.post(
    '/',
    middleware.isNewUserValid,
    // middleware.isCreateBodyValid,
    // middleware.userNormalizator,
    middleware.checkIsEmailUnique,
    userController.create);

router.get(
    '/:userId',
    middleware.isUserIdValid,
    middleware.getUserDynamically('userId', 'params', '_id'),
    userController.getById);

router.put(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    // middleware.isUpdateBodyValid,
    // middleware.userNormalizator,
    middleware.getUserDynamically('userId', 'params', '_id'),
    userController.update);

router.delete(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isUserExist,
    userController.delete);

module.exports = router;