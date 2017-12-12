/**
 * Created by nour on 6/15/17.
 */

var express = require('express');
var router = express.Router();
var users = require('../controllers/user');


var passport	= require('passport');
var myPassportService = require('../users/config/passport')(passport);

router.post('/authenticate',users.login);
router.post('/signup',users.SignUp);

router.put('/update/:mail',users.updateUser);
router.get('/get/:mail',users.findUser);

router.get('/info', passport.authenticate('jwt', { session: false}),users.memberinfo);
module.exports = router;