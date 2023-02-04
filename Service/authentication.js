const env = require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const bcrypt = require('bcrypt');

const authentificate =  function(req, res, next)  {
    try {
        var Tokens = AuthController.Token
        jwt.verify(Token[0], process.env.ACCESS_TOKEN_SECRET, function(err, user){
            if(err) {
                res.json({
                    message: 'Token verification Failed'
                })
            }
            else {
                req.user = user
                next()
            }
        })
        
    }
    catch(error) {
        res.json({
            message: 'error in authentification'
        })
    }
}
function Authenticated(req, res, next){
    
    if(req.isAuthenticated()){
        //console.log('checkAuthenticated true')
        return next()
    }
    res.redirect('/login');
    //console.log('checkAuthenticated false')
}

function admin(req, res, next){
    if(req.isAuthenticated() && req.user.role == 'admin'){
        //console.log('admin auth true')
        return next()
    }
    res.redirect('/home');
    //console.log('admin auth false')
}

function NotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return next()
}

module.exports = { authentificate, Authenticated, NotAuthenticated, admin};