const nodemailer = require('nodemailer');
const {NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../config/config');

const sendEmail = (receiverMail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });
    return transporter.sendMail({
        from: 'No reply',
        to: receiverMail,
        subject: 'TEST',
        html: '<h2> Hello from Node.JS</h2>'
    })
};

module.exports = {
    sendEmail
};