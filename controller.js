const fs = require('fs');
const multer=require('koa-multer');

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/static/icon')
        },
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
            cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })

    var upload = multer({ storage: storage });

    router.post('/upload',upload.single('file'), require(__dirname+'/controllers/head.js')['MODIFY']);
}


module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};