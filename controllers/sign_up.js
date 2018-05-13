// sign_up:

var fs = require('fs');
var path = require('path');
var URL = require('url');
var querystring = require('querystring');
var crypto = require('crypto');
var sendEmail = require('./mail.js');

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

var sign_up_html = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/sign_up.html');
    await next();
}

var sign_up_js = async (ctx, next) => {
    ctx.response.type = 'text/javascript';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, "..") + '/views/sign_up.js');
    await next();
}

var sign_up_post = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.request.body.id || "";
    var password = ctx.request.body.password || "";
    var email = ctx.request.body.email || "";
    var date = new Date().getTime();
    var map = new Map();
    var verify_code = md5(id + password + date);


    var req = 'select * from verify_table where id = ?';
    var row = await database.query(req, [id]);
    var flag1 = row.length;

    req = 'select * from user_table where id = ?';
    row = await database.query(req, [id]);
    var flag2 = row.length;

    if (flag1 + flag2 > 0) {
        map['state'] = 'FAILURE';
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = JSON.stringify(map);
    }
    else {
        req = 'insert into verify_table values (?, ?, ?, ?, ?)';
        row = await database.query(req, [id, password, email, verify_code, date]);
        var veri_html = '<a href=http://localhost:3000/sign_up/ve?index=' + verify_code + '>http://localhost:3000/sign_up/ve?index=' + verify_code + '</a>';

        sendEmail(email, '注册验证码', '', veri_html);

        map['state'] = 'SUCCESS';
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = JSON.stringify(map);
    }

    await next();
}

var sign_up_verify = async (ctx, next) => {
    var database = require('./load_database.js')();
    var arg = URL.parse(ctx.request.url).query || "";
    var index = querystring.parse(arg).index;
    var req = 'select * from verify_table where verification_code = ?';
    var row = await database.query(req, [index]);

    if (row.length == 0) {
        console.log('空');
    }
    else {
        console.log(row[0]['id']);
        var id = row[0]['id'];
        var password = row[0]['password'];
        var email = row[0]['email'];

        req = 'insert into user_table values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        row = await database.query(req, [id, password, email, 0, 0, 0, 0, 2500, 0, 0, 0, 2500, 0, 3000, 0, 0, 0, 3000, 0, 3500, 0, 0, 0, 3500, 0, 3500, 0, 0, 0, 3500, 0]);

        req = 'delete from verify_table where id = ?'
        row = await database.query(req, [id]);

        req = 'create table ' + id + '_IELTS (id int(6), correct int(6), total int(6), rate float, date double, islearn int(6));'
        row = await database.query(req);
        req = 'insert into ' + id + '_IELTS select * from ori_IELTS;'
        row = await database.query(req);

        req = 'create table ' + id + '_level_4 (id int(6), correct int(6), total int(6), rate float, date double, islearn int(6));'
        row = await database.query(req);
        req = 'insert into ' + id + '_level_4 select * from ori_level_4;'
        row = await database.query(req);

        req = 'create table ' + id + '_level_6 (id int(6), correct int(6), total int(6), rate float, date double, islearn int(6));'
        row = await database.query(req);
        req = 'insert into ' + id + '_level_6 select * from ori_level_6;'
        row = await database.query(req);

        req = 'create table ' + id + '_toefl (id int(6), correct int(6), total int(6), rate float, date double, islearn int(6));'
        row = await database.query(req);
        req = 'insert into ' + id + '_toefl select * from ori_toefl;'
        row = await database.query(req);

        //注册后无法直接进入主页面 并且无法登录
        ctx.response.type = 'text/html';
        ctx.response.status = 200;
        ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/sign_in.html');
    }

    await next()
}

module.exports = {
    'GET /sign_up': sign_up_html,
    'GET /sign_up.js': sign_up_js,
    'GET /sign_up/ve': sign_up_verify,
    'POST /sign_up/si': sign_up_post
};
