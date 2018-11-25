var express = require('express');
var path = require('path');
var router = require('./routes/routes');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

// 默认目录
app.set('views',path.join(__dirname,'./views'));

//开放目录权限
app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));

//处理post请求
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//session
app.set('trust proxy', 1);
app.use(session({
    secret: 'Encrypted string',
    resave: false,
    saveUninitialized: true,
}));

//加载路由
app.use(router);


app.listen(5000,function () {
    console.log('启动了')
});