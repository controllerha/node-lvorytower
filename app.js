var express = require('express');
var path = require('path');

//路由
var router = require('./routes/routes');
var rout_register = require('./routes/register');
var rout_login = require('./routes/login');
var rout_locookie = require('./routes/locookie');

var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lvorytower');

//设置跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","http://localhost:9000");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","application/x-www-form-urlencoded,application/json,Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    //允许提交cookie
    res.header("Access-Control-Allow-Credentials", "true");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options'){
        res.send(200);  //让options尝试请求快速结束
    }else{
        next();
    }
});

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
    secret: 'xxxxx',
    name:'lvcookie',
    cookie: {maxAge: 1000*60*60},
    resave: false,
    saveUninitialized: false,
    store:require('mongoose-session')(mongoose)
}));

//加载路由
app.use(router);
app.use(rout_register);
app.use(rout_login);
app.use(rout_locookie);

app.listen(5000,function () {
    console.log('启动了')
});