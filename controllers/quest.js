// quest:

var fs = require('fs');
var path = require('path');

var quest_html = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, '..') + '/views/quest.html');
    await next();
}

var quest_js = async (ctx, next) => {
    ctx.response.type = 'text/javascript';
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(path.resolve(__dirname, "..") + '/views/quest.js');
    await next();
}

var quest_dic = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.cookies.get('uid');
    var today = new Date(new Date().toLocaleDateString()).getTime();

    var map = new Map();
    map['state'] = "SUCCESS";

    var timestamp = new Date().getTime() + 1000 * 60 * 10;
    var table_name = id + '_' + ctx.request.body.type;

    ctx.cookies.set('uid', id, { expires: new Date(timestamp) });


    var req = 'SELECT * from user_table WHERE id=' + ctx.cookies.get('uid') + ';';
    var row = await database.query(req);
    var target = row[0][ctx.request.body.type];
    var total = row[0][ctx.request.body.type + '_total'];
    var left = row[0][ctx.request.body.type + '_left'];
    var review_target = row[0][ctx.request.body.type + '_review_target'];
    var last_day = row[0][ctx.request.body.type + '_review_submission_date'];
    var learned = row[0][ctx.request.body.type + '_learned'];
    var review_learned = row[0][ctx.request.body.type + '_review_learned'];

    var real_target = Math.min(target, left);
    var real_review_target = Math.min(review_target, Number(total) - Number(left));

    req = 'select * from ' + table_name + ' where islearn > 0';
    row = await database.query(req);

    if (last_day < today) {
        //新的一天 分配题目
        req = 'update ' + table_name + ' set islearn=1  where islearn=0 and date = 0 limit ' + real_target;
        row = await database.query(req);
        req = 'UPDATE user_table SET ' + ctx.request.body.type + '_review_learned = 0, ' + ctx.request.body.type + '_learned = 0 WHERE id= ' + id + ';';
        row = await database.query(req);
    }
    else if (row.length === 0 && Number(learned) < Number(real_target)) {
        //用户当天更改练习内容 多分配一部分题目
        req = 'select * from ' + table_name + ' where islearn=1';
        row = await database.query(req);
        var new_target = Number(real_target) - row.length - Number(learned);
        req = 'update ' + table_name + ' set islearn=1  where islearn=0 and date = 0 limit ' + new_target;
        row = await database.query(req);
    }
    else if (row.length === 0 && Number(review_learned) < Number(real_review_target)) {
        //分配复习题目
        req = 'select * from ' + table_name + ' where islearn=1';
        row = await database.query(req);
        var new_target = Number(real_review_target) - row.length - Number(review_learned);
        req = 'update ' + table_name + ' set islearn=1 where islearn = 0 and date > 0 order by rate limit ' + new_target;
        row = await database.query(req);
    }
    else if (row.length === 0) {
        //答题完毕
        map['state'] = "FINAL";
    }

    req = 'SELECT * from user_table WHERE id=' + ctx.cookies.get('uid') + ';';
    row = await database.query(req);
    learned = row[0][ctx.request.body.type + '_learned'];
    review_learned = row[0][ctx.request.body.type + '_review_learned'];

    if (map['state'] === "SUCCESS") {

        req = 'select * from ' + table_name + ' where islearn > 0';
        row = await database.query(req);

        map['done'] = learned;
        map['review_done'] = review_learned;
        map['total'] = real_target;
        map['review_total'] = real_review_target;

        now = new Date().getTime()
        req = 'UPDATE  user_table SET ' + ctx.request.body.type + '_review_submission_date = ' + now + ' WHERE id=' + id + ';';
        console.log(req);
        row = await database.query(req);

        req = 'select * from ' + table_name + ' where islearn > 0 order by islearn, rate';
        row = await database.query(req);
        console.log(req);

        var correct_id = row[0]['id'];
        var id_1 = (new Date().getTime() + Math.floor(Math.random() * 100000)) % 15328 + 1;
        var id_2 = (new Date().getTime() + Math.floor(Math.random() * 100000)) % 15328 + 1;
        var id_3 = (new Date().getTime() + Math.floor(Math.random() * 100000)) % 15328 + 1;
        var correct_place = (new Date().getTime() + Math.floor(Math.random() * 100000)) % 4;
        req = 'select * from words where id = ?';
        row = await database.query(req, [correct_id]);

        map['id'] = row[0]['ID'];
        map['word'] = row[0]['Word'];
        map['right'] = correct_place;
        map['type'] = ctx.request.body.type;
        var right_meaning = row[0]['meaning'];

        req = 'select * from words where id = ?';
        row = await database.query(req, [id_1]);
        var meaning_1 = row[0]['meaning'];

        req = 'select * from words where id = ?';
        row = await database.query(req, [id_2]);
        var meaning_2 = row[0]['meaning'];

        req = 'select * from words where id = ?';
        row = await database.query(req, [id_3]);
        var meaning_3 = row[0]['meaning'];

        if (correct_place === 0) {
            map['answer_0'] = right_meaning;
            map['answer_1'] = meaning_1;
            map['answer_2'] = meaning_2;
            map['answer_3'] = meaning_3;
        }
        else if (correct_place === 1) {
            map['answer_1'] = right_meaning;
            map['answer_0'] = meaning_1;
            map['answer_2'] = meaning_2;
            map['answer_3'] = meaning_3;
        }
        else if (correct_place === 2) {
            map['answer_2'] = right_meaning;
            map['answer_0'] = meaning_1;
            map['answer_1'] = meaning_2;
            map['answer_3'] = meaning_3;
        }
        else if (correct_place === 3) {
            map['answer_3'] = right_meaning;
            map['answer_0'] = meaning_1;
            map['answer_1'] = meaning_2;
            map['answer_2'] = meaning_3;
        }
    }

    console.log(map);

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);

    await next();
}

var quest_ans = async (ctx, next) => {
    var database = require('./load_database.js')();
    var id = ctx.cookies.get('uid');
    var table_name = id + '_' + ctx.request.body.data.type;
    var timestamp = new Date().getTime() + 1000 * 60 * 10;
    var map = ctx.request.body.data;

    ctx.cookies.set('uid', id, { expires: new Date(timestamp) });

    if (ctx.request.body.choose === map.right) {

        timestamp = new Date().getTime();
        var req = 'SELECT * from user_table WHERE id=' + id + ';';
        console.log(req);
        var row = await database.query(req);
        var target = row[0][ctx.request.body.data.type];
        var total = row[0][ctx.request.body.data.type + '_total'];
        var learned = row[0][ctx.request.body.data.type + '_learned'];
        var left = row[0][ctx.request.body.data.type + '_left'];
        var review_learned = row[0][ctx.request.body.data.type + '_review_learned'];
        var review_target = row[0][ctx.request.body.data.type + '_review_target'];
        var last_day = row[0][ctx.request.body.data.type + '_review_submission_date'];

        var real_target = Math.min(target, left);
        var real_review_target = Math.min(review_target, Number(total) - Number(left));

        req = 'UPDATE ' + table_name + ' SET islearn = 0 , total = total + 1 , correct = correct + 1  WHERE id= ' + map.id + ';';
        row = await database.query(req);
        req = 'SELECT * from ' + table_name + ' WHERE id= ' + map.id + ';';
        row = await database.query(req);
        var rate = row[0]['correct'] / row[0]['total'];

        if (row[0]['date'] === 0) {
            req = 'UPDATE ' + table_name + ' SET rate = ' + rate + ', date = ' + timestamp + ' WHERE id= ' + map.id + ';';
            row = await database.query(req);
            map['done'] = learned + 1;
            req = 'UPDATE user_table SET ' + ctx.request.body.data.type + '_learned = ' + map['done'] + ' , ' + ctx.request.body.data.type + '_left = ' + ctx.request.body.data.type + '_left - 1  WHERE id= ' + id + ';';
            row = await database.query(req);
            map['state'] = "SUCCESS";
        }
        else {
            req = 'UPDATE ' + table_name + ' SET rate = ' + rate + ' WHERE id= ' + map.id + ';';
            row = await database.query(req);
            map['review_done'] = review_learned + 1;
            req = 'UPDATE user_table SET ' + ctx.request.body.data.type + '_review_learned = ' + map['review_done'] + ' WHERE id= ' + id + ';';
            row = await database.query(req);
            map['state'] = "SUCCESS";
        }
    }
    else {
        var req = 'UPDATE ' + table_name + ' SET islearn = islearn + 1 , total = total + 1 WHERE id= ' + map.id + ';';
        var row = await database.query(req);
        req = 'SELECT * from ' + table_name + ' WHERE id= ' + map.id + ';';
        row = await database.query(req);
        var rate = row[0]['correct'] / row[0]['total'];
        req = 'UPDATE ' + table_name + ' SET rate = ' + rate + ' WHERE id= ' + map.id + ';';
        row = await database.query(req);
        map['state'] = "FAILURE";
    }

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);

    await next();
}

module.exports = {
    'GET /quest': quest_html,
    'GET /quest.js': quest_js,
    'POST /quest/dic': quest_dic,
    'POST /quest/ans': quest_ans
};
