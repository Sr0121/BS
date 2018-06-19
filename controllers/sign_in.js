// sign_in:

var fs = require('fs');
var path = require('path');

var sign_in_html = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/sign_in.html');
    await next();
}

var sign_in_post = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.request.body.id || "";
    var password = ctx.request.body.password || "";
    var map = new Map();

    var req = 'select * from user_table where id = ? and password = ?';
    var row = await database.query(req, [id, password]);

    if (row.length == 0) {
        map['state'] = 'FAILURE';
    }
    else {
        map['state'] = 'SUCCESS';
        var timestamp = new Date().getTime() + 1000 * 10 * 60;
        ctx.cookies.set('uid', row[0]['id'], { expires: new Date(timestamp) });
    }


    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);
    await next();
}

module.exports = {
    'GET /sign_in': sign_in_html,
    'POST /sign_in/si': sign_in_post
};
