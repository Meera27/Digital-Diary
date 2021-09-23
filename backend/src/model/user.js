const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DigitalDiary');

const User = mongoose.model('User', {
    fname : String,
    lname : String,
    email : String,
    phno : String,
    username : String,
    paswd : String
});

module.exports = User