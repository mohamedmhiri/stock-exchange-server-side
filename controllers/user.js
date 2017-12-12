/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var user = require('../users/models/user.js');
const util = require('util');
var jwt         = require('jwt-simple');
var passport	= require('passport');
var config      = require('../users/config/database'); // get db config file

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports= {

    login: function(req, res) {
  user.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
},
    SignUp: function(req, res) {
  if (!req.body.nom || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } 
      else
      {var newUser = new user({
      nom: req.body.nom,
      password: req.body.password,
       email:req.body.email

    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.',err:err});
      }
      res.json({success: true, msg: 'Successful created new user.',username:user.nom});
    });}
  },

    findUser:function(req, res, next) {
        user.findOne({
            email: req.params.mail
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).json();
            } else res.status(200).json(user);


            }).populate('transaction');
    },
    updateUser:function(req, res, next) {
        user.findOneAndUpdate({
              email: req.params.mail
        },req.body, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(404).json();
            } else res.status(200).json(user);


        });
    },
    memberinfo:function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            console.log(decoded);
            user.findOne({
                email: decoded.email,
           
            }, function(err, user) {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    res.json({success: true, msg: 'Welcome in the member area ' + user.nom + '!'});
                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }
    }
}