// sign_in:

var fs = require('fs');
var path = require('path');

var sign_welcome_html = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/sign_welcome.html');
    await next();
};

module.exports = {
    'GET /sign_welcome': sign_welcome_html,
};
