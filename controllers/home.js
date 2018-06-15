// home:

var fs = require('fs');
var path = require('path');

var home_html = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/home.html');
    await next();
};

var home_info = async (ctx, next) => {
    var id = ctx.cookies.get('uid');
    var map = new Map();
    var database = require('./load_database.js')();
    var req = 'select * from user_table where id = ?';

    var row = await database.query(req, [id]);
    if (row.length == 0) {
        map['state'] = 'FAILURE';
    }
    else {
        map['state'] = 'SUCCESS';
        map['id'] = row[0]['id'];
        map['user_name'] = row[0]['user_name'];
        map['user_icon'] = row[0]['user_icon'];
        map['password'] = row[0]['password'];
        map['email'] = row[0]['email'];
        map['level_4'] = row[0]['level_4'];
        map['level_6'] = row[0]['level_6'];
        map['toefl'] = row[0]['toefl'];
        map['IELTS'] = row[0]['IELTS'];
    }
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);

    await next();
};

var home_change = async (ctx, next) => {
    var database = require('./load_database.js')();
    var map = new Map();
    // ctx.cookies.set('uid', id, {expires: new Date(timestamp)});
    //当用户更改目标变小时使用
    var req = 'SELECT * from user_table WHERE id=' + ctx.cookies.get('uid') + ';';
    console.log(req);
    var row = await database.query(req);
    var target = row[0][ctx.request.body.type];
    var total = row[0][ctx.request.body.type + '_total'];
    var learned = row[0][ctx.request.body.type + '_learned'];
    var left = row[0][ctx.request.body.type + '_left'];
    var review_learned = row[0][ctx.request.body.type + '_review_learned'];
    var review_target = row[0][ctx.request.body.type + '_review_target'];



    req = 'UPDATE user_table SET ' + ctx.request.body.type + '=' + ctx.request.body.num + ' , '
        + ctx.request.body.type + '_review_target = ' + Math.floor(ctx.request.body.num * 1.5)
        + ' WHERE id=' + ctx.cookies.get('uid') + ';';
    console.log(req);
    row = await database.query(req);

    await next();
};

module.exports = {
    'GET /home': home_html,
    'GET /home/info': home_info,
    'POST /home/change': home_change
};
