/**
 * Created by nour on 6/15/17.
 */

var express = require('express');
var router = express.Router();
var transaction = require('../controllers/transaction');




router.post('/add',transaction.add);
router.get('/get/:id',transaction.findTransaction);
router.get('/getbyuser/:id',transaction.gettransactionByUser);
//router.post('/signup',users.SignUp);

//router.put('/update/:id',users.updateUser);

module.exports = router;