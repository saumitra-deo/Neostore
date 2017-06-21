var express = require('express');
var router = express.Router();
var validator = require('validator');
var getUser = require('../../../database/getUser');
var authController=require('../v1/jwtTokengenerator');

router.put('/', function (req, res, next) {
    //res.send('respond with a resource');

    console.log(req.files);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var samplefile = req.files.samplefile;

    // Use the mv() method to place the file somewhere on your server
    samplefile.mv(__dirname + '/../../UploadedImages/' + samplefile.name, function(err) {
        if (err)
           { return res.status(500).send(err);}
else
    {    res.json({
                status: "1",
                statusMessage: "File Uploaded",

            });}
    });
    // if(req.files && req.files.length>0){
    //
    // }else{
    //     res.json({
    //         status: "0",
    //         statusMessage: "File not Found",
    //         dataSet: ""
    //     });
    // }
});

router.post('/', function (req, res, next) {
    var status, statusMessage, dataSet;
    var invalidBody = false;
     console.log("File name : "+req.body.email);
    if (!validator.isEmail(req.body.email)) {  //!req.body.email
        status = '008';
        statusMessage = 'please enter a valid email';
        invalidBody = true;
    } else if (!req.body.password ) {  // !validator.matches(req.body.password, /^.{6,}$/i)
        status = '009';
        statusMessage = 'please enter your password';
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
        email: req.body.email,
        password:req.body.password
    };

    var callback = function (data) {
            console.log("--->"+data);
        if (data != null) {
            var gettoken=authController.auth(login_details);
            var response = {
                "user_id":data[0]._id,
                "first_name"  : data[0].first_name,
                "last_name": data[0].last_name,
                "email"       : data[0].email,
               // "accesstoken":gettoken

            };
            status = '200';
            statusMessage = 'Login Successful';
            dataSet = response;
            //accessToken=gettoken;

        } else {
            status = '404';
            statusMessage = 'Invalid Credentials or This User does not exist';
            //dataSet = data[0];
        }

        res.json({
            status: status,
            statusMessage: statusMessage,
            dataSet: dataSet,
            accessToken:gettoken,
        });

        return;
    };
    console.log("login");
    getUser(
        login_details,
        callback
    );
});



module.exports = router;