const {oauthService, emailService} = require("../services");
const OAuth = require('../db/OAuth');
const User = require('../db/User');
const {WELCOME} = require("../config/email-action.enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const {FRONTEND_URL} = require("../config/config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('evseinka@gmail.com', WELCOME, {userName: user.name});

            await oauthService.comparePassword(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id})

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;

            await OAuth.deleteOne({refreshToken});

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id})

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo;

            await OAuth.deleteOne({accessToken});

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo;

            await OAuth.deleteMany({_user_id});

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user;

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, {email: user.email});
            const forgotPassFrontUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await emailService.sendEmail('evseinka@gmail.com', FORGOT_PASSWORD, {url: forgotPassFrontUrl});

            res.json('ok')
        } catch (e) {
            next(e)
        }
    },

    setPasswordAfterForgot: async (req,res,next)=>{
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);
            await User.updateOne({id: req.user._id}, {password: hashPassword});
        }catch (e) {
            next(e)
        }
    }
}