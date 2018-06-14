// quest:

var fs = require('fs');
var path = require('path');

var word_html = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/wordbook.html');
    await next();
};

var word_add = async (ctx, next) => {
    var database = require('./load_database.js')();
    var word = ctx.request.body.word_add_word;
    var translate = ctx.request.body.word_add_translation;

    var id = ctx.cookies.get('uid');
    if(id != undefined){
        var timestamp = new Date().getTime() + 1000 * 10 * 60;
        ctx.cookies.set('uid', id, { expires: new Date(timestamp) });

        var req = 'insert into ' + id + '_user_dic values (? , ?);';
        var row = await database.query(req, [word, translate]);

        ctx.response.status = 200;
        ctx.response.body = 0;
    }
    else{
        ctx.response.status = 200;
        ctx.response.body = -1;
    }

    await next();
};

var word_check = async (ctx, next) => {
    var database = require('./load_database.js')();
    var word = ctx.request.body.word_add_word;
    var translate = ctx.request.body.word_add_translation;
    var map = new Map();
    var id = ctx.cookies.get('uid');
    if(id != undefined){
        var timestamp = new Date().getTime() + 1000 * 10 * 60;
        ctx.cookies.set('uid', id, { expires: new Date(timestamp) });

        var req = 'select * from ' + id + '_user_dic where Word = ?;';
        var row = await database.query(req, [word]);
        if(row.length > 0){
            map['in_list'] = true;
        }
        else{
            map['in_list'] = false;
        }
        map['state'] = 'SUCCESS';
    }
    else{
        map['state'] = 'FAIL';
    }

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);

    await next();
};

var word_list = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.cookies.get('uid');
    var map = new Map();
    if(id != undefined){
        var timestamp = new Date().getTime() + 1000 * 60 * 10;
        ctx.cookies.set('uid', id, { expires: new Date(timestamp) });
        var req = 'select * from ' + id + '_user_dic ;';
        var row = await database.query(req);
        console.log(row.length);
        var text = "";
        for(var i = 0; i < row.length; i++){
            text = text +
                '<tr> <td style="vertical-align: middle !important;text-align: center;">' +
                ' <div id="word_' + row[i]['Word'] + '" class="word_flip">' +
                '<span style = "cursor: pointer">'+row[i]['Word'] + '</span> ' +
                '</div> ' +
                '<div class="row" style="display:none;" id="panel_word_' + row[i]['Word'] + '">' +
                '<div class="col-md-3"> </div> <div class="col-md-6 text-center">' +
                '<div >' +
                '<br> ' + row[i]['lx']  +
                '</div> ' + '</div> ' +'<div class="col-md-3 ">'+ '<br> ' +
                '<span id="word_set_'+ row[i]['Word'] +'" style = "cursor: pointer" class="word_set">' + '✎ ' +'</span>'+
                '<span id="word_del_'+ row[i]['Word'] +'" style = "cursor: pointer" class="word_del">' + '✖' +'</span>' +
                '</div>' +
                '</div>' +
                '</td> ' +
                '</tr>';
        }
        map['state'] = 'SUCCESS';
        map['html'] = text;
    }
    else{
        map['state'] = 'FAIL';
    }

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);

    await next();
};

var word_del = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.cookies.get('uid');
    var map = new Map();
    if(id != undefined){
        var req = 'delete from ' + id + '_user_dic where Word = ?;';
        var row = await database.query(req, [ctx.request.body.word]);
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
}

var word_set = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.cookies.get('uid');
    var map = new Map();
    if(id != undefined){
        var req = 'update ' + id + '_user_dic set lx = ? where Word = ?;';
        var row = await database.query(req, [ctx.request.body.translation, ctx.request.body.word]);
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

module.exports = {
    'GET /wordbook': word_html,
    'GET /wordbook/list': word_list,
    'POST /wordbook/newword': word_add,
    'POST /wordbook/del' : word_del,
    'POST /wordbook/set' : word_set,
    'POST /wordbook/check' : word_check
};
