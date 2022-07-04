const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', UserSchema);
