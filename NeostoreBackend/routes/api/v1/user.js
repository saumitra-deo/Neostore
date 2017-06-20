var express = require('express');
var router = express.Router();
var validator = require('validator');

var registerUser = require('../../../database/registerUser');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});



router.post('/', function (req, res, next) {
    var status, statusMessage, dataSet;
    var invalidBody = false;
    console.log("body is"+JSON.stringify(req.body));

    if (!req.body.first_name) {
        status = '001';
        statusMessage = 'First name is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!validator.matches(req.body.first_name,/^[A-Za-z ]+$/)) {
        status = '002';
        statusMessage = 'First name must be only alphabets';
        dataSet = {};
        invalidBody = true;
    }
    else if (!req.body.last_name) {
        status = '003';
        statusMessage = 'Last name is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!validator.matches(req.body.last_name,/^[A-Za-z ]+$/)) {
        status = '004';
        statusMessage = 'Last name must be only alphabets';
        dataSet = {};
        invalidBody = true;
    }
    else if (!req.body.gender) {
        status = '005';
        statusMessage = 'Gender is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!validator.isIn(req.body.gender,["male","female"])) {
        status = '006';
        statusMessage = 'Gender must be Male or Female';
        dataSet = {};
        invalidBody = true;
    }
    else if (!req.body.email) {
        status = '007';
        statusMessage = 'Email is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!validator.isEmail(req.body.email)) {
        status = '008';
        statusMessage = 'please enter valid email';
        dataSet = {};
        invalidBody = true;
    } else if (!req.body.password) {
        status = '009';
        statusMessage = 'password is required';
        dataSet = {};
        invalidBody = true;
    } else if (!validator.matches(req.body.password,/^[A-Za-z ]+$/)) {
        status = '010';
        statusMessage = 'password must be minimum 6 letters ';
        dataSet = {};
        invalidBody = true;
    }else if (!req.body.birth_date) {
        status = '011';
        statusMessage = 'birth_date is required';
        dataSet = {};
        invalidBody = true;
    }else if (!req.body.phone) {
        status = '012';
        statusMessage = 'Phone Number is required';
        dataSet = {};
        invalidBody = true;
    }
    else if (!validator.matches(req.body.phone,/^\d{10}$/)) {
        status = '013';
        statusMessage = 'Phone Number must be 10 digit only ';
        dataSet = {};
        invalidBody = true;
    }else if (!req.body.user_role) {
        status = '014';
        statusMessage = 'User Role is required';
        dataSet = {};
        invalidBody = true;
    }else if (!validator.isIn(req.body.user_role,["user","admin"])) {
        status = '015';
        statusMessage = 'User Role must be user or admin';
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
        user_role   : req.body.user_role,
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        gender      : req.body.gender,
        email       : req.body.email,
        password    : req.body.password,
        birth_date  : req.body.birth_date,
        phone       : req.body.phone,
        facebook_id : req.body.facebook_id,
        gmail_id    : req.body.gmail_id


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