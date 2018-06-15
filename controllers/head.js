var fs = require('fs');
var path = require('path');
const multer=require('koa-multer');

var head_quit = async (ctx, next) => {
    var id = ctx.cookies.get('uid');
    ctx.cookies.set('uid', id, { expires: new Date(0) });
    ctx.response.status = 200;
    await next();
}

var head_set = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.cookies.get('uid');
    var map = new Map();
    if(id != undefined){
        console.log(ctx.request.body);
        var req = "update user_table set password = ? where id = ?;";
        var row = await database.query(req, [ctx.request.body.password, id]);
        map['state'] = 'SUCCESS';
        var timestamp = new Date().getTime() + 1000 * 60 * 10;
        ctx.cookies.set('uid', id, { expires: new Date(timestamp) });
    }
    else{
        map['state'] = 'FAIL';
    }

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);
    await next();
};

var head_set_user_name = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.cookies.get('uid');
    var map = new Map();
    if(id != undefined){
        console.log(ctx.request.body);
        var req = "update user_table set user_name = ? where id = ?;";
        var row = await database.query(req, [ctx.request.body.name, id]);
        map['state'] = 'SUCCESS';
        var timestamp = new Date().getTime() + 1000 * 60 * 10;
        ctx.cookies.set('uid', id, { expires: new Date(timestamp) });
    }
    else{
        map['state'] = 'FAIL';
    }

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);
    await next();
};

var head_set_icon = async(ctx, next)=>{
    var database = require('./load_database.js')();
    // ctx.req.file.filename;
    var id = ctx.cookies.get('uid');
    var map = new Map();
    if(id != undefined){
        var req = "select * from user_table where id = ?;";
        var row = await database.query(req, [id]);
        var del_file = row[0]['user_icon'];
        if(del_file != 'default_img.jpeg'){
            fs.unlinkSync(__dirname+'/../static/icon/'+del_file);
        }
        req = "update user_table set user_icon = ? where id = ?;";
        row = await database.query(req, [ctx.req.file.filename, id]);
        map['state'] = 'SUCCESS';
        var timestamp = new Date().getTime() + 1000 * 60 * 10;
        ctx.cookies.set('uid', id, { expires: new Date(timestamp) });
        ctx.response.redirect("/home");
    }
    else{
        map['state'] = 'FAIL';
        ctx.response.redirect("/sign_in");
    }
    await next();
};

module.exports = {
    'POST /head/quit': head_quit,
    'POST /head/set' : head_set,
    'POST /head/set_user_name' : head_set_user_name,
    'MODIFY' : head_set_icon,
};
