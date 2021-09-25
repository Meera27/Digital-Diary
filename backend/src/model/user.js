const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.zmywv.mongodb.net/DigitalDiary?retryWrites=true&w=majority');

const User = mongoose.model('User', {
    fname : String,
    lname : String,
    email : String,
    phno : String,
    username : String,
    paswd : String
});

module.exports = User