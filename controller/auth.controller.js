const {oauthService} = require("../services");
const OAuth = require('../db/OAuth');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await oauthService.comparePassword(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user_id})

            res.json({
                user,
                ...tokenPair
            })
        } catch (e) {
            next(e)
        }
    }
}