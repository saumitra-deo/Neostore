var express = require('express');
var router = express.Router();

var registerUser = require('../../../database/registerUser');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
    var status, statusMessage, dataSet;
    var invalidBody = false;

    if (!req.body.first_name) {
        status = '001';
        statusMessage = '"first_name" is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!req.body.last_name) {
        status = '002';
        statusMessage = '"last_name" is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!req.body.gender) {
        status = '003';
        statusMessage = '"gender" is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!req.body.email) {
        status = '004';
        statusMessage = '"email" is required';
        dataSet = {};
        invalidBody = true;
    } else if (!req.body.password) {
        status = '005';
        statusMessage = '"password" is required';
        dataSet = {};
        invalidBody = true;
    } else if (!req.body.birth_date) {
        status = '006';
        statusMessage = '"birth_date" is required';
        dataSet = {};
        invalidBody = true;
    } else if (!req.body.phone) {
        status = '007';
        statusMessage = '"phone" is required';
        dataSet = {};
        invalidBody = true;
    } else if (!req.body.image) {
        status = '008';
        statusMessage = '"image" is required';
        dataSet = {};
        invalidBody = true;
    }



    if (invalidBody) {
        res.json({
            status: status,
            statusMessage: statusMessage,
            dataSet: dataSet
        });

        return;
    }


    var login_details = {
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        gender      : req.body.gender,
        email       : req.body.email,
        password    : req.body.password,
        birth_date  : req.body.birth_date,
        phone       : req.body.phone,
        image       : req.body.image


    };

    var callback = function (data) {
        res.json({
            status: data.status,
            statusMessage: data.statusMessage,

        });

        return;
    };

    registerUser(
        login_details,
        callback
    );
});

module.exports = router;