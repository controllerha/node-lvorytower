var express = require('express');
var rout_login = express.Router();

var User = require('../models/user');
var md5 = require('blueimp-md5');

rout_login.post('/login', async function (req, res) {
    var body = req.body;
    // 等待查询是否重复
    User.findOne({
        num_value:body.num_value,
        pwd_value:md5(md5(body.pwd_value))
    },function (err,user) {
        if (err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        if(!user){
            return res.status(200).json({
                err_code:1,
                message:'账号或者密码错误'
            })
        }
        req.session.user = user;
        console.log(req.session.cookie.domain);
        console.log(req.session.cookie);
        // req.session.cookie.domain = "http:127.0.0.1:5000/login";
        console.log(req.session);
        res.status(200).json({
            err_code:0,
            message:'登陆成功'
        })
    });
});

module.exports = rout_login;