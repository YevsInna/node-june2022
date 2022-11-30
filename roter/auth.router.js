const router = require('express').Router();

const {authController} = require('../controller');
const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');


router.post(
    '/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    authController.login);

module.exports = router;
