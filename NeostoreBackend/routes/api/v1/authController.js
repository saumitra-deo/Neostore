/**
 * Created by webwerks on 16/06/17.
 */
var jwt=require('jsonwebtoken');

module.exports.auth=function (req,res) {
    var user={
        username:"test",
        emai:"test@test.com"
    }
    var token=jwt.sign(user,process.env.SECRET_KEY,{
        expiresIn:8000
    });
    res.json({
        success:true,
        token:token
    });
}