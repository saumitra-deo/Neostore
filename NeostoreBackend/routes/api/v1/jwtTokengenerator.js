/**
 * Created by webwerks on 16/06/17.
 */
var database = require('../../../database/db.js');
var jwt=require('jsonwebtoken');

module.exports.auth=function (login_details) {
        console.log('auth'+login_details.email);
   // var db = database.getDatabase();
    //var collection = db.collection('Users');
    //var user;
    // collection.find({email:login_details.email}).toArray(function(err, data) {
    //     assert.equal(err,!null,"error in firing query");
    //     console.log("full-->"+data[0].email);
    //     user={
    //
    //         email:data[0].email
    //     };
    //
    //
    // });


    var token=jwt.sign({"email":login_details.email},process.env.SECRET_KEY,{
        expiresIn:8000
    });

     //console.log("token"+token);

        return token;
    // res.json({
    //     success:true,
    //     token:token
    // });
}