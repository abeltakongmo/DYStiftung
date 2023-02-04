const router = require("express").Router();
const User = require("../Model/user");
const moment = require('moment')

const rate = async (req, res, next) => {
    try{
        let users = await User.find({})
        user = users[0]
        if(!user) {return res.status(500).json({msg:'user does not exist anymore'}); }
        else {
            var _score =  {
                ip: req.sessionID,
                rate: req.body.rate,
            }
            var rate = user?.rates.find(rt => rt.ip.toString() === req.sessionID.toString() )
            if(rate) {
                user.rates.pull(rate); 
            }
            user.rates.push(_score);
            const option = { new:true };
            const nuser = await User.findByIdAndUpdate(user._id, user, option)
        }
        res.status(200).json({rate: req.body.rate, success: 1, message: 'rate updated!'})
    }
    catch(err){
    res.status(500).json({message: err+ ' error in rate API'})
    console.log(err+ ' error in rate API')
    }
};

const getscore = async (req, res, next) => {
    try{
        let users = await User.find({})
        user = users[0]
        crate = 0
        score = 0;
        rater = 1
        myrate = 0; myscore = 0;
        var found = user?.rates.find(rt => rt.ip.toString() === req.sessionID.toString() )
        if(found) myrate = found.rate
        for(rt of user?.rates) {
            crate = crate + rt.rate
        }
        if(user.rates.length != 0) score = crate / user.rates.length
        res.status(200).json({score: score.toFixed(1), success: 1, rates: user.rates.length, rate:myrate})
    }
    catch(err){
    res.status(500).json({message: err+ ' error in getscore API'})
    console.log(err+ ' error in getscore API')
    }
};

const getcomments = async (req, res, next) => {
    try{
        let users = await User.find({})
        var user = users[0]
        let comments = []
        for(ct of user.comments){
            var _comment = {name: ct.name, text: ct.text, date: moment(ct.date).fromNow()}
            comments.push(_comment)
        }
        res.status(200).json({comments:comments.reverse(), success:1, element: comments.length})
    }
    catch(err){
      res.status(500).json({message:err})
      console.log(err+ ' error in comments API')
    }
};
const comment = async (req, res, next) => {
    try{
        let users = await User.find({})
        var user = users[0]
        if (user){
            var _comment = {
              ip:  req.sessionID,
              name: req.body.name,
              text: req.body.text,
              date: Date.now()
          }
          user.comments.push(_comment)
          np = await User.findByIdAndUpdate(user._id, user, {option:true})
          res.status(200).json({ success: 1})
        }
        else{
            res.status(200).json({ success: 0, message: 'comment can not be add!'})
        }
    }
    catch(err){
      res.status(500).json({message:err})
      console.log(err+ ' error in comment API')
    }
};

  module.exports = { getcomments, comment, rate, getscore};
