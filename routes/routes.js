var express = require('express');
var router = express.Router();
var User = require('../models/user');
var md5 = require('blueimp-md5');

router.get('/', function (req, res) {
    res.send('哈哈哈');
});

module.exports = router;