const {WELCOME, FORGOT_PASS} = require("../config/email-action.enum");
module.exports = {
    [WELCOME]: {
        subject: 'Welcome to Node.js',
        templateName: 'welcome'
    },
    [FORGOT_PASS]: {
        subject: 'Forgot password',
        templateName: 'forgot-pass'
    }
}