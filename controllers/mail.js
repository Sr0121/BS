var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: '18867138461@163.com',
        pass: 'bsproject123'
    }
});

var sendMail = function (recipient, subject, plain, html) {

    var mailOptions = {
        from: '18867138461@163.com',
        to: recipient,
        subject: subject,
        text: plain,
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

module.exports = sendMail;