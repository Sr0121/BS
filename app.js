const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
// var cookieParser = require('cookie-parser');
const controller = require('./controller');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// app.use(cookieParser());

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.use(require('koa-static')(__dirname + '/views'))
app.use(require('koa-static')(__dirname + '/static'))

app.listen(3000);
console.log('app started at port 3000...');