const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.zmywv.mongodb.net/DigitalDiary?retryWrites=true&w=majority');

const Post = mongoose.model('Post', {
    UserID : String,
    title: {
        type: String,
        required: true
    },
    category : String,
    image :String,
    content : String,
    review:String
});


module.exports = Post