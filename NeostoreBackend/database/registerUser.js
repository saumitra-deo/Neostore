/**
 * Created by webwerks on 25/04/17.
 */
var database = require('./db');
var assert = require('assert');

var registerUser = function (login_details, callback) {
    // Get the documents collection
    var db = database.getDatabase();
    console.log("inside register user");
    var collection = db.collection('Users');
    // Find some documents
    collection.find().toArray(function(err, data) {
        assert.equal(err, null);
        console.log("data"+JSON.stringify(data));
        if (data.length > 0) {
            callback({
                status:"0005",
                statusMessage : 'Failed'
            });
        } else {
            //callback(err);
            collection.insertOne({
                first_name  : login_details.first_name,
                last_name   : login_details.last_name,
                gender      : login_details.gender,
                email       : login_details.email,
                password    : login_details.password,
                birth_date  : login_details.birth_date,
                phone       : login_details.phone,
                image       : login_details.image

            }, function(error, datain) {
                if(error==null){
                    callback({
                        status:"0001",
                        statusMessage : 'Inserted Successfully'
                    });
                }
            });
        }
    });
};

module.exports = registerUser;