var db = {}

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
// var url = 'mongodb://localhost:27017/Neostore';

var url = 'mongodb://10.0.100.212:27017/NeostoreDB';


var database;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    database = db;

    // db.close();
});

db.getDatabase = function() {
    return database;
}

module.exports = db;