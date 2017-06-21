var database = require('./db');
var assert = require('assert');
var bcrypt = require('bcryptjs');
var mongodb=require('mongodb');
var getUserFunctions={};

getUserFunctions.getUser = function (login_details, callback) {
    // Get the documents collection
    console.log("inside function");
    var db = database.getDatabase();
    var collection = db.collection('Users');
    // Find some documents

    //collection.find({email:login_details.email})

    collection.find({email:login_details.email
    }).toArray(function(err, data) {
        assert.equal(err,null,"No Data Found");
        console.log("full-->"+data[0].password)
       console.log(bcrypt.compareSync(login_details.password, data[0].password));//compare password from db

        if (bcrypt.compareSync(login_details.password, data[0].password)) {   //data && !err
            console.log("success from db");
            callback(data);
        } else {
            console.log("error"+err);

            callback(err);
        }
    });
};

getUserFunctions.getUserDetails =function (user_id,callback) {
// Get the documents collection
    var db = database.getDatabase();
    var collection = db.collection('Users');
    collection.find({_id: mongodb.ObjectId(user_id)
    }).toArray(function(err, data) {
        //assert.equal(err,null,"No Data Found");
        if(err!=null)
        {
            callback(data);
        }else{
            callback([]);
        }
    });
    db.close();
} ;

module.exports = getUserFunctions;
