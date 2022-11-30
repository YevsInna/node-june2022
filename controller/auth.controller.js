const {oauthService} = require("../services");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;
            console.log(user)
            await oauthService.comparePassword(user.password, body.password);

            res.json('ok')
        } catch (e) {
            next(e)
        }
    }
}