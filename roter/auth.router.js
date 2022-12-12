const router = require('express').Router();

const {authController} = require('../controller');
const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');


router.post(
    '/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    authController.login);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post(
    '/logoutAll',
    authMiddleware.checkAccessToken,
    authController.logoutAll);

router.post(
    '/password/forgot',
    userMiddleware.getUserDynamically('email'),
    authController.forgotPassword
);

router.put(
    '/password/forgot',
    authMiddleware.checkActionToken,
    authController.setPasswordAfterForgot
)

module.exports = router;
