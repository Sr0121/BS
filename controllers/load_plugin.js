
var fs = require('fs');
var path = require('path');

var radialindicator_js = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/radialindicator.js');
    await next();
}


module.exports = {
    'GET /radialindicator.js': radialindicator_js
};
