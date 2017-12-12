/**
 * Created by nour on 6/13/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var user= require('../../users/models/user.js');
var TransactionSchema = new Schema({

    valeur:{
        type: String
    },
    type:{
        type: String      
    },
    sens:{
        type: String
    },
    quantite:{
        type: Number
    },
    date:{
        type: String
    },
    user : { type: Schema.Types.ObjectId, ref: 'user' },
});


 
module.exports = mongoose.model('transaction', TransactionSchema);
