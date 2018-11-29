var express = require('express');
var rout_locookie = express.Router();

rout_locookie.get('/locookie', function (req, res) {
    if(!req.session.user){
        return res.status(200).json({
            err_code:1
        });

    }
    return res.status(200).json({
        err_code:0,
        name_value:req.session.user.num_value
    });
});

module.exports = rout_locookie;