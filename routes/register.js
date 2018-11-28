var express = require('express');
var rout_register = express.Router();
var co_option = require('../public/js/yanzheng');

var User = require('../models/user');
var md5 = require('blueimp-md5');

rout_register.post('/register', async function (req, res) {
    var body = req.body;

    //判断是否有人绕过前端逻辑
    var co1 = co_option("1",body.num_value);
    if(co1){
        return res.status(200).json(co1);
    }
    var co2 = co_option("2",body.pwd_value);
    if(co2){
        return res.status(200).json(co2);
    }
    var co3 = co_option("3",body.email_value);
    if(co3){
        return res.status(200).json(co3);
    }

    // 等待查询是否重复
    if (await User.findOne({email_value: body.email_value})) {
        return res.status(200).json({
            err_code: 1,
            message: '邮箱已存在'
        })
    }
    if (await User.findOne({num_value: body.num_value})) {
        return res.status(200).json({
            err_code: 2,
            message: '账号已存在'
        })
    }
    body.pwd_value = md5(md5(body.pwd_value));
    await new User(body).save().then((user) => {

    return res.status(200).json({
        err_code: 0,
        message: '注册成功'
    })
}, (err) => {
        return res.status(500).json({
            err_code: 500,
            message: err.message
        })
    });
});
module.exports = rout_register;