var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 引入接口
var book = require('./routes/book');
var user = require('./routes/user');

var test = require('./test/mysql-pool');


var app = express();

// 注册引入的接口
app.use(function(req, res, next){
	console.log(req.url);
	next();
});
app.use('/test', test);
app.use('/book', book);
app.use('/user', user);

app.use('/', express.static('html/'));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(function(req, res, next) {
	console.log(req.headers);
	res.redirect('./404.html');
	next();
});

// error handler
app.use(function(err, req, res, next) {
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




