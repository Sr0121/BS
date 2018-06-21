var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: 'xxx@163.com',
        pass: 'yyy'
    }
});

var sendMail = function (recipient, subject, plain, html) {

    var mailOptions = {
        from: 'xxx@163.com',
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