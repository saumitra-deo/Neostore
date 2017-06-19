var express = require('express');
var router = express.Router();
var getUser = require('../../../database/getUser');

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
    var invalidBody = true;
     console.log("File name : "+req.body.email);
    // if (!req.body.email) {
    //     status = '003';
    //     statusMessage = 'email is required';
    //     dataSet = {};
    //
    //     invalidBody = true;
    // } else if (!req.body.password) {
    //     status = '004';
    //     statusMessage = 'password is required';
    //     dataSet = {};
    //
    //     invalidBody = true;
    // }

    // if (invalidBody) {
    //     res.json({
    //         status: status,
    //         statusMessage: statusMessage,
    //         dataSet: dataSet
    //     });
    //
    //     return;
    // }


    var login_details = {
        email: req.body.email
       // password:req.body.password
    };

    var callback = function (data) {

        if (data.length === 1) {
            status = '0001';
            statusMessage = 'Success';
            dataSet = data[0];
        } else {
            status = '0002';
            statusMessage = 'Failure';
            dataSet = data[0];
        }

        res.json({
            status: status,
            statusMessage: statusMessage,
            dataSet: dataSet
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