const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {ErrorResponse} = require('./class');
/*// 引入接口
var book = require('./routes/book');
var user = require('./routes/user');

// var test = require('./test/mysql-pool');*/
require('./functions/socket');

const app = express();

// app.use(favicon(__dirname + '/html/images/favicon.ico'));
// 注册引入的接口
app.use(function (req, res, next) {
    // console.log(req.url);
    next();
});
const index = require('./routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', index);

app.use('/', express.static('html/'));
app.use(function (req, res, next) {
    res.status(200)
        .send(new ErrorResponse({code: 404, data: {path: req.path}, msg: '路径错误'}));
    next();
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next();
});

// console.log()

module.exports = app;




