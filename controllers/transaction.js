/**
 * Created by nour on 6/13/17.
 */
var express = require('express');
var transaction = require('../transaction/models/transaction.js');
const util = require('util');
var jwt = require('jwt-simple');
var passport = require('passport');
var config = require('../users/config/database'); // get db config file
var dateTime = require('node-datetime');

module.exports = {


  add: function (req, res) {
    if (!req.body.type || !req.body.valeur || !req.body.sens || !req.body.quantite) {
      res.json({ success: false, msg: 'Please pass all argument.' });
    }
    else {
      var dt = dateTime.create();
      var formatted = dt.format('Y-m-d H:M:S');
      var newtransaction = new transaction({
        valeur: req.body.valeur,
        type: req.body.type,
        sens: req.body.sens,
        quantite: req.body.quantite,
        date: formatted,
        user:req.body.user

      });
      // save the user
      newtransaction.save(function (err) {
        if (err) {
          return res.json({ success: false, msg: 'cannot save transaction', err: err });
        }
        res.json({ success: true, msg: 'Successful created new transaction.', transaction: newtransaction });
      });
    }
  },

  findTransaction: function (req, res, next) {
    transaction.findOne({
      _id: req.params.id
    }, function (err, transaction) {
      if (err) throw err;

      if (!transaction) {
        return res.status(404).json();
      } else res.status(200).json(transaction);


    })
  },
  updateUser: function (req, res, next) {
    user.findOneAndUpdate({
      username: req.params.id
    }, req.body, function (err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(404).json();
      } else res.status(200).json(user);


    });
  }
,
gettransactionByUser:function (req, res, next) {
    transaction.find({user:req.params.id}, function(err, transaction) {
        if (err) throw err;
        // object of all the users
        //console.log(compte);
        res.json(transaction)
    });
},
  memberinfo: function (req, res) {
    var token = getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      console.log(decoded);
      user.findOne({
        email: decoded.email,

      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          res.json({ success: true, msg: 'Welcome in the member area ' + user.nom + '!' });
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: 'No token provided.' });
    }
  }
}