/**
 * Created by webwerks on 25/04/17.
 */
var database = require('./db');
var assert = require('assert');
var bcrypt = require('bcryptjs');

var registerUser = function (login_details, callback) {
    // Get the documents collection
    var db = database.getDatabase();
    console.log("inside register user");
    var collection = db.collection('Users');

    // Find some documents

    collection.find({"email" : login_details.email}).toArray(function(err, data) {

    // collection.find({email:login_details.email}).toArray(function(err, data) {

        assert.equal(err, null);
        console.log("data"+JSON.stringify(data));
        if (data.length > 0) {
            callback({
                status:"0005",
                statusMessage : 'email already exist'
            });
        } else {
            //callback(err);
            console.log(login_details.password);
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(login_details.password, salt);
            console.log('hash-->'+hash);
            if (login_details.facebook_id == "" && login_details.gmail_id == "") {
                collection.insertOne({
                    first_name  : login_details.first_name,
                    last_name   : login_details.last_name,
                    gender      : login_details.gender,
                    email       : login_details.email,
                    password    : hash,    //login_details.password
                    birth_date  : login_details.birth_date,
                    phone       : login_details.phone,
                    user_role   : login_details.user_role,
                    facebook_id : "",//login_details.facebook_id,
                    gmail_id    : "",//login_details.gmail_id,
                    created_date : new Date(),
                    modified_date : ""


                }, function(error, datain) {
                    if(error==null){
                        callback({
                            status:"0001",
                            statusMessage : 'Inserted Successfully'
                        });
                    }
                });
            }
            else {
                collection.insertOne({
                    first_name  : login_details.first_name,
                    last_name   : login_details.last_name,
                    gender      : login_details.gender,
                    email       : login_details.email,
                    password    : "",    //must be empty
                    birth_date  : login_details.birth_date,
                    phone       : login_details.phone,
                    user_role   : login_details.user_role,
                    facebook_id : login_details.facebook_id,
                    gmail_id    : login_details.gmail_id,
                    created_date : new Date(),
                    modified_date : ""


                }, function(error, datain) {
                    if(error==null){
                        callback({
                            status:"0001",
                            statusMessage : 'Inserted Successfully'
                        });
                    }
                });
            }

        }
    });
};

module.exports = registerUser;