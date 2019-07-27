const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    bornDate: {
        type: Date
    },
    sex: String
});

module.exports = mongoose.model('users', userSchema);
