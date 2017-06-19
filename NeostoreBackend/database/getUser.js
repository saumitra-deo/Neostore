var database = require('./db');
var assert = require('assert');
console.log("outside function");
var getUser = function (login_details, callback) {
    // Get the documents collection
    console.log("inside function");
    var db = database.getDatabase();
    var collection = db.collection('Users');
    // Find some documents
    collection.find({
        $and : [{
            email : login_details.email,
           // Password:login_details.password
        }]
    }).toArray(function(err, data) {
        assert.equal(err, null);
        if (data && !err) {
            console.log("sucess");
            callback(data);
        } else {
            console.log("error");
            callback(err);
        }
    });
};

module.exports = getUser;